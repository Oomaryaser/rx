export default function Badge({ children }: { children: React.ReactNode }) {
 return <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs">{children}</span>;
}
