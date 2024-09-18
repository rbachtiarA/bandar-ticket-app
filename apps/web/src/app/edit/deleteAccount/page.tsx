
import DeleteAccount from '@/components/editing/delete';
import Wrapper from '@/components/wrapper';

export default function ChangeName() {
  return (
    <Wrapper>
      <div className="flex justify-center w-full">
        <DeleteAccount />
      </div>
    </Wrapper>
  );
}
