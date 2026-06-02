import { useEffect, useMemo, useState } from 'react'
import { Mail, MessageSquare } from 'lucide-react'
import { getContacts } from '../../api'
import Card from '../components/ui/Card'
import Table from '../components/ui/Table'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { Skeleton } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'

const PAGE_SIZE = 8

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await getContacts()
        if (!cancelled) setContacts(res.data)
      } catch {
        if (!cancelled) setContacts([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
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
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [search])

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'created_at',
      label: 'Date',
      render: (row) =>
        new Date(row.created_at).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
    },
    {
      key: 'message',
      label: 'Preview',
      render: (row) => (
        <span className="max-w-[200px] truncate block text-zinc-500">
          {row.message}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => setSelected(row)}>
          View
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <input
          type="search"
          placeholder="Search contacts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl bg-zinc-900/60 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/40"
        />
      </div>

      <Card className="!p-0 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No contact submissions"
            description="Messages from your portfolio contact form will appear here."
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
              <div className="flex items-center justify-between px-4 py-4 border-t border-white/5">
                <p className="text-xs text-zinc-500">
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

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Message"
        size="lg"
      >
        {selected && (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">From</p>
              <p className="font-medium text-zinc-100">{selected.name}</p>
              <a
                href={`mailto:${selected.email}`}
                className="text-sm text-violet-400 hover:text-violet-300"
              >
                {selected.email}
              </a>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Message</p>
              <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {selected.message}
              </p>
            </div>
            <p className="text-xs text-zinc-600">
              {new Date(selected.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}
