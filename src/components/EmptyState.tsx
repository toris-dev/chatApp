const EmptyState = () => {
  return (
    <div
      className={`flex h-full items-center justify-center bg-gray-100 px-4 py-10 sm:px-6 lg:px-8 lg:py-6 `}
    >
      <div className={`flex flex-col items-center text-center`}>
        <h3 className={`mt-2 text-2xl font-semibold text-gray-900`}>
          채팅을 선택하거나 새 대화를 시작하세요.
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
