import EditName from '@/components/editing/name';
import Wrapper from '@/components/wrapper';

export default function ChangeName() {
  return (
    <Wrapper>
      <div className="flex justify-center w-full">
        <EditName />
      </div>
    </Wrapper>
  );
}
