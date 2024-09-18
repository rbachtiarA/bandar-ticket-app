'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { emailAction, roleAction } from '@/app/redux/slice/userSlice';

import { getToken } from '@/lib/server';
import { becomeOrganizer, checkEmail, editEmail } from '@/lib/user';
import { IBecomeOrganizer, IEditEmail } from '@/type/user';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



export default function BecomeOrganizer() {
  const router = useRouter();
  const user = useAppSelector((state) => state.author);
  const dispatch = useAppDispatch();
  const onBecomingOrganizer = async (data: IBecomeOrganizer) => {
    try {
      const token = await getToken();
      const { result, ok } = await becomeOrganizer(
        String(user.id),
        token as string,
      );
      if (!ok) throw result.msg;
      dispatch(roleAction(data));

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
        role: '' as string,
      }}
      onSubmit={() => {
        onBecomingOrganizer({ role: 'ORGANIZER' });
      }}
    >
      {() => {
        return (
          <Form>
            <div className="min-w-[30vw] h-max">
              <h1 className="text-base font-semibold leading-7 text-gray-900 text-center w-full mb-4">
                Becoming Organizer
              </h1>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 w-full text-center ">
                  Are you ready to become an organizer?
                </label>
                <h1 className="text-base font-semibold leading-7 text-gray-900 text-center w-full mb-4">
                READ THIS
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et esse soluta, iusto amet ex molestiae neque numquam quae, hic tenetur tempora quod perspiciatis eligendi labore animi. Eaque quaerat nesciunt dolores?</p>
                
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
