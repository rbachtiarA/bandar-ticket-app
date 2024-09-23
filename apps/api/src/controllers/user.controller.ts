import prisma from '@/prisma';
import { Request, Response } from 'express';
import { addMonths } from 'date-fns';
import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { transporter } from '@/helper/nodemailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password, role, referCode } = req.body;
      console.log(req.body); //for testing

      // add discount to the new user if they use refer code. default, false
      let discount = false;
      let discountExpiresAt: Date | null = null;

      // check existing users
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          msg: 'Email already in use',
        });
      }

      // using referral code to add 10000 to the referral code user wallet, not the new user
      const newReferCode =
        name.slice(0, 7).toUpperCase() +
        String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

      // Hash the password
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          referCode: newReferCode, //new refer code for new user
          role: role,
          wallet: 0,
          avatar: null,
          discount: discount,
          discountExpires: discountExpiresAt,
        },
      });

      //verification token
      const payload = { id: newUser.id, referCode: referCode };
      const token = sign(payload, process.env.SECRET_JWT!, {
        expiresIn: '24h',
      });

      // handlebar to make template
      const templatePath = path.join(
        __dirname,
        '../template',
        'verificationMail.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = Handlebars.compile(templateSource);
      const html = compiledTemplate({
        name: newUser.name,
        link: `http://localhost:3000/verify/${token}`,
      });

      // nodemailer to send mail to new user
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: newUser.email,
        subject: 'Welcome to our platform',
        html: html,
      });

      res.status(201).send({
        status: 'ok',
        msg: 'user created',
        newUser,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: `SOMETHINGS WRONG, ${err}`,
      });
    }
  }

  async checkEmail(req: Request, res: Response) {
    const { email } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      console.log(`INSIDE VERIFY EMAIL`);

      const decoded = verify(req.params.token, process.env.SECRET_JWT!) as {
        id: number;
        referCode: string;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (user?.isVerify === true) throw new Error('email already verified');

      if (decoded.referCode && decoded.referCode !== '') {
        const referrer = await prisma.user.findUnique({
          where: { referCode: decoded.referCode },
        });

        if (referrer) {
          await prisma.user.update({
            where: { id: referrer.id },
            data: {
              points: referrer.points + 10000,
              lastPointsUpdate: new Date(),
            },
          });
        }
      }

      await prisma.user.update({
        data: { isVerify: true },
        where: { id: decoded.id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'email verified',
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err instanceof Error ? err.message : 'verification process failed',
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) throw new Error('user not found');
      if (!user.isVerify) throw new Error('please verify your email first');

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) throw new Error('password do not match!!');

      const payload = { id: user.id, role: user.role };
      const token = sign(payload, process.env.SECRET_JWT!, {
        expiresIn: '24h',
      });

      res.status(200).send({
        status: 'ok',
        msg: 'login success',
        token,
        user: user,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err instanceof Error ? err.message : 'login process terminated',
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.LOGOUT === 'private',
        sameSite: 'strict',
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err instanceof Error ? err.message : 'logout process terminated',
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        include:{
          Event: true,
          TrasactionEvent: true,
          Review: true
        }
      });

      res.status(200).send({
        status: 'ok',
        msg: 'users found',
        users,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      console.log('Request Headers:', req.headers);
      console.log('Decoded User from Token:', req.user);

      const userId = req.user?.id;
      const findUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'user found',
        name: findUser?.name,
        avatar: findUser?.avatar,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const findUser = await prisma.user.findUnique({
        where: {
          email: req.params.email,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'user found',
        user: findUser,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateName(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const updateUser = await prisma.user.update({
        data: {
          name: name,
        },
        where: {
          id: req.user?.id,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'name updated',
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { password } = req.body;

      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      await prisma.user.update({
        data: {
          password: hashPassword,
        },
        where: {
          id: req.user?.id,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'password updated',
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async becomeOrganizer(req: Request, res: Response) {
    try {
      const updateUser = await prisma.user.update({
        data: {
          role: 'ORGANIZER',
        },
        where: {
          id: req.user?.id,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'role updated',
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const updateUser = await prisma.user.update({
        data: {
          email: email,
        },
        where: {
          id: req.user?.id,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'email updated',
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateAvatar(req: Request, res: Response) {
    try {
      if (!req.file) throw new Error('file not found');

      const link = `http://localhost:8000/api/public/avatar/${req?.file?.filename}`;
      await prisma.user.update({
        data: {
          avatar: link,
        },
        where: {
          id: req.user?.id,
        },
      });
      res.status(200).send({
        status: 'ok',
        msg: 'avatar updated',
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        status: 'err',
        msg: err instanceof Error ? err.message : 'something went wrong',
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleteUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'user deleted',
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }
}
