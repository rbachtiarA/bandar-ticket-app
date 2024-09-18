'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { emailAction } from '@/app/redux/slice/userSlice';

import { getToken } from '@/lib/server';
import { checkEmail, editEmail } from '@/lib/user';
import { IEditEmail } from '@/type/user';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('invalid email')
    .required('email required')
    .test('checkEmail', 'email already in use', async (value) => {
      if (value) {
        const { exists } = await checkEmail(value);
        return !exists;
      }
      return true;
    }),
});

export default function EditEmail() {
  const router = useRouter();
  const user = useAppSelector((state) => state.author);
  const dispatch = useAppDispatch();
  const onEditEmail = async (data: IEditEmail) => {
    try {
      const token = await getToken();
      const { result, ok } = await editEmail(
        String(user.id),
        data,
        token as string,
      );
      if (!ok) throw result.msg;
      dispatch(emailAction(data));

      toast.success(result.msg);

      router.push('/user');
    } catch (error) {
      console.log(error);
      toast.error(error as string);
    }
  };
  return (
    <Formik
      initialValues={{
        email: '' as string,
      }}
      validationSchema={emailSchema}
      onSubmit={(values) => {
        onEditEmail(values);
      }}
    >
      {() => {
        return (
          <Form>
            <div className="min-w-[30vw] h-max">
              <h1 className="text-base font-semibold leading-7 text-gray-900 text-center w-full mb-4">
                Change Email
              </h1>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 ">
                  New Email
                </label>
                <div>
                  <Field
                    name="email"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 p-1.5 text-sm font-medium rounded-md bg-orange-500 mb-4"
              >
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
