import { useEffect, useMemo, useState } from 'react'
import { Mail, MessageSquare, Search } from 'lucide-react'
import { getContacts } from '../../api'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { Skeleton } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'

const PAGE_SIZE = 10

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [page,     setPage]     = useState(1)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await getContacts()
        if (!cancelled) setContacts(Array.isArray(res.data) ? res.data : [])
      } catch {
        if (!cancelled) setContacts([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return contacts
    const q = search.toLowerCase()
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q)
    )
  }, [contacts, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [search])

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (row) => (
        <span className="font-medium text-zinc-200">{row.name}</span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => (
        <a
          href={`mailto:${row.email}`}
          className="text-violet-400 hover:text-violet-300 transition-colors text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          {row.email}
        </a>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      render: (row) =>
        new Date(row.created_at).toLocaleDateString(undefined, {
          month: 'short',
          day:   'numeric',
          year:  'numeric',
        }),
    },
    {
      key: 'message',
      label: 'Preview',
      render: (row) => (
        <span className="max-w-[220px] truncate block text-zinc-500 text-xs">
          {row.message}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => { e.stopPropagation(); setSelected(row) }}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-5">

      {/* Summary */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <Mail className="h-4 w-4 text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-200">
            {loading ? '—' : `${contacts.length} message${contacts.length !== 1 ? 's' : ''}`}
          </p>
          <p className="text-xs text-zinc-600">From your portfolio contact form</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
        <input
          type="search"
          placeholder="Search by name, email, or message…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-zinc-900/60 border border-white/8 pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500/40 transition-colors"
        />
      </div>

      {/* Table card */}
      <Card className="!p-0 overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No contact submissions"
            description={
              search
                ? 'No messages match your search.'
                : 'Messages from your portfolio contact form will appear here.'
            }
          />
        ) : (
          <>
            <div className="p-4 pb-0">
              <Table
                columns={columns}
                data={paginated}
                onRowClick={setSelected}
                emptyMessage="No matches"
              />
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
                <p className="text-xs text-zinc-600">
                  Page {page} of {totalPages} · {filtered.length} total
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Message detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Message"
        size="lg"
      >
        {selected && (
          <div className="space-y-5">

            {/* Sender info */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/6">
              <div className="w-9 h-9 rounded-full bg-violet-500/15 flex items-center justify-center shrink-0 text-sm font-semibold text-violet-300">
                {selected.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-zinc-100">{selected.name}</p>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {selected.email}
                </a>
              </div>
            </div>

            {/* Message */}
            <div>
              <p className="text-[0.6875rem] uppercase tracking-widest text-zinc-600 font-semibold mb-2">
                Message
              </p>
              <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed bg-white/[0.03] border border-white/6 rounded-xl px-4 py-4">
                {selected.message}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-zinc-700">
              <span>
                {new Date(selected.created_at).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
              <a
                href={`mailto:${selected.email}?subject=Re: Portfolio inquiry`}
                className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                Reply via email →
              </a>
            </div>

          </div>
        )}
      </Modal>

    </div>
  )
}
