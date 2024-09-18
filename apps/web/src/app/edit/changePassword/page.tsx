
import EditPassword from '@/components/editing/password';
import Wrapper from '@/components/wrapper';

export default function ChangeName() {
  return (
    <Wrapper>
      <div className="flex justify-center w-full">
        <EditPassword />
      </div>
    </Wrapper>
  );
}
