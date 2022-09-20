const Title = ({module, text}) => {
  const modules = module.split('>');
  return (
    <div className="font-bold text-lg border border-sandworm-yellow mb-10 p-5 shadow rounded">
      <code>{modules[0]}</code> {text}
      {modules.length > 1 && (
        <div className="text-zinc-400 text-xs">
          via{' '}
          {modules
            .slice(1)
            .map((p) => <code key={p}>{p}</code>)
            .reduce((prev, curr) => [prev, ' > ', curr])}
        </div>
      )}
    </div>
  );
};

export default Title;
