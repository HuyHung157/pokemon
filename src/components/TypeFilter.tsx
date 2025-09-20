interface TypeFilterProps {
  types: { name: string; url: string }[];
  onSelect: (type: string[]) => void;
  activeTypes: string[];
}

export default function TypeFilter({ types, onSelect, activeTypes }: TypeFilterProps) {

  const toggleType = (name: string) => {
    console.log('toggleType', name);
    const exists = activeTypes.includes(name);
    if (exists) {
      onSelect(activeTypes.filter((t) => t !== name));
    } else {
      onSelect([...activeTypes, name]);
    }
  };

  return (
    <section className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span>Types:</span>
      {types.map((t) => (
        <button
          key={t.name}
          onClick={() => toggleType(t.name)}
          className={`border p-4 ${
            activeTypes.includes(t.name) ? "bg-blue-500 text-white" : ""
          }`}
        >
          {t.name}
        </button>
      ))}
    </section>
  );
}
