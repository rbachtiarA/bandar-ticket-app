import prisma from '@/prisma';
import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password, role, referCode } = req.body;
      console.log(req.body);

      // using referral code to add 10000 to the referral code user wallet, not the new user
      const newReferCode =
        name.slice(0, 7).toUpperCase() +
        String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
      
      // Hash the password
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      // 1. Create new user with selected role (default to CUSTOMER if not provided)
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          referCode: newReferCode, // Use the generated referCode
          role: role, 
          wallet: 0,
        },
      });

      // 2. Check if the user was referred by someone and update the referrer's wallet
      if (referCode && referCode.length !== "") {
        const referrer = await prisma.user.findUnique({
          where: { referCode },
        });

        if (referrer) {
          await prisma.user.update({
            where: { id: referrer.id },
            data: {
              wallet: referrer.wallet + 10000, // Add 10000 to the referrer's wallet
            },
          });
        }
      }

      res.status(201).send({
        status: 'ok',
        msg: 'user created',
        newUser,
      });

    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: "SOMETHINGS WRONG",
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

      if (!user) throw 'user not found';

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) throw 'password do not match!!';

      const payload = { id: user.id, role: user.role };
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1h' });

      res.status(200).send({
        status: 'ok',
        msg: 'login success',
        token,
        user: user,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

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
      const findUser = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
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

  async updateUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name,
          email,
          password: hashPassword,
        },
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const deleteUser = await prisma.user.delete({
        where: {
          email: email,
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
