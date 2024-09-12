'use client';

import { loginUser } from '@/lib/user';

import { ILogin } from '@/type/user';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('email required'),
  password: yup
    .string()
    .min(6, 'password must be at least 6 characters')
    .required('password required'),
});

export default function LoginForm() {
  const router = useRouter();
  const onLogin = async (data: ILogin, action: FormikHelpers<ILogin>) => {
    try {
      const { result, ok } = await loginUser(data);
      if (!ok) throw result.msg;
      toast.success(result.msg);
      action.resetForm();
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, action) => {
        onLogin(values, action);
      }}
    >
      {() => {
        return (
          <Form>
            <div className=" min-w-[30vw]">
              <div className="mt-10">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <Field
                    name="email"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
                    component={'div'}
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <Field
                    name="password"
                    type="password"
                    className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="password"
                    component={'div'}
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 p-1.5 text-sm font-medium rounded-md bg-orange-500 "
              >
                Login
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
