'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { nameAction } from '@/app/redux/slice/userSlice';

import { getToken } from '@/lib/server';
import { editName } from '@/lib/user';
import { IEditName } from '@/type/user';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const nameSchema = yup.object().shape({
  name: yup.string().required('name required'),
});

export default function EditName() {
  const router = useRouter();
  const user = useAppSelector((state) => state.author);
  const dispatch = useAppDispatch();
  const onEditName = async (data: IEditName) => {
    try {
      const token = await getToken();
      const { result, ok } = await editName(String(user.id), data, token as string);
      if (!ok) throw result.msg;
      dispatch(nameAction(data));
      
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
        name: '' as string,
      }}
      validationSchema={nameSchema}
      onSubmit={(values) => {
        onEditName(values);
      }}
    >
      {() => {
        return (
          <Form>
            <div className='min-w-[30vw] h-max'>
              <h1 className="text-base font-semibold leading-7 text-gray-900 text-center w-full mb-4">Change Name</h1>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 ">New Name</label>
                <div>
                  <Field name="name" type="text" className="block w-full rounded-md border-0 p-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  <ErrorMessage name="name" component="div" className="text-sm text-red-500"/>
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
