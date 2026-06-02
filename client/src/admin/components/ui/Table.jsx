export default function Table({ columns, data, onRowClick, emptyMessage = 'No data' }) {
  if (!data?.length) {
    return (
      <p className="text-center text-sm text-zinc-500 py-12">{emptyMessage}</p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 bg-zinc-900/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-medium text-zinc-500 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id ?? i}
              onClick={() => onRowClick?.(row)}
              className={[
                'border-b border-white/5 last:border-0 transition-colors',
                onRowClick ? 'cursor-pointer hover:bg-white/[0.03]' : '',
              ].join(' ')}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
