'use client';
import { registerUser } from '@/lib/user';
import { IRegister } from '@/type/user';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  name: yup.string().required('name required'),
  email: yup.string().email('invalid email').required('email required'),
  password: yup
    .string()
    .min(6, 'password must be at least 6 characters')
    .required('password required'),
  referCode: yup
    .string()
    .min(13, 'refer code must be 13 characters including space').optional(),
  role: yup.string().oneOf(['CUSTOMER', 'ORGANIZER', 'ADMIN']),
});

export default function RegisterForm() {
    const onRegister = async (data: IRegister) => {
        try {
          const { result, ok } = await registerUser(data);
          if(!ok) throw result.msg
          toast.success(result.msg);
          
        } catch (err: any) {
          console.log(err);
          toast.error(err as string);
        }
      };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        referCode: "",
        role: "CUSTOMER",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, action) => {
        onRegister(values);
        //action.resetForm();
        
      }}
    >
      {() => {
        return (
          <Form>
            <div className=" min-w-[30vw]">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Register
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
              <div className="mt-10">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mb-2">
                  <Field
                    name="name"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name"
                    component={'div'}
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mb-2">
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
                <div className="mb-2">
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
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Referral Code
                </label>
                <div className="mb-2">
                  <Field
                    name="referCode"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="referCode"
                    component={'div'}
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Role
                </label>
                <div className="mb-2">
                  <Field as="select" name="role" className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value="CUSTOMER">Customer</option>
                    <option value="ORGANIZER">Organizer</option>
                    <option value="ADMIN">Admin</option>{' '}
                    {/* If you allow admin registration */}
                  </Field>
                  <ErrorMessage
                    name="role"
                    component={'div'}
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 p-1.5 text-sm font-medium rounded-md bg-orange-500 "
              >
                Register
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
