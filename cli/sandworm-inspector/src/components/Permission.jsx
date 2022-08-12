function Permission({method, onClick, checked}) {
  return (
    <div className="flex items-center">
      <input readOnly type="checkbox" checked={checked} onClick={onClick} />{' '}
      <code
        onClick={onClick}
        className="text-sm ml-2 border-b border-dotted tooltip cursor-pointer select-none"
      >
        {method.name}
      </code>
      {method.url && (
        <a href={method.url} target="_blank" rel="noopener noreferrer">
          <i className="bi bi-box-arrow-up-right block ml-4 text-zinc-400 text-sm" />
        </a>
      )}
      {method.description && (
        <span className="text-xs ml-2 text-zinc-400">{method.description}</span>
      )}
    </div>
  );
}

export default Permission;
