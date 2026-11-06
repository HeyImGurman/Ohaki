import { useMemo, useState } from 'react'
import './App.css'

const initialIssues = [
  {
    id: 'OHK-1842',
    title: "Cannot read properties of undefined (reading 'id')",
    type: 'TypeError',
    location: 'src/features/projects/ProjectCard.jsx:42',
    project: 'web-app',
    environment: 'production',
    browser: 'Chrome 129.0',
    users: 24,
    events: 186,
    time: '2 min ago',
    status: 'unresolved',
    color: 'coral',
  },
  {
    id: 'OHK-1841',
    title: 'Network request failed',
    type: 'FetchError',
    location: 'src/api/client.js:18',
    project: 'web-app',
    environment: 'production',
    browser: 'Safari 18.1',
    users: 12,
    events: 73,
    time: '18 min ago',
    status: 'unresolved',
    color: 'purple',
  },
  {
    id: 'OHK-1839',
    title: 'Failed to load resource: the server responded with a status of 500',
    type: 'HttpError',
    location: 'src/services/billing.js:106',
    project: 'dashboard',
    environment: 'production',
    browser: 'Firefox 131.0',
    users: 8,
    events: 41,
    time: '42 min ago',
    status: 'unresolved',
    color: 'amber',
  },
  {
    id: 'OHK-1838',
    title: 'Maximum update depth exceeded',
    type: 'ReactError',
    location: 'src/components/FilterMenu.jsx:67',
    project: 'web-app',
    environment: 'staging',
    browser: 'Chrome 129.0',
    users: 5,
    events: 19,
    time: '1 hr ago',
    status: 'resolved',
    color: 'blue',
  },
  {
    id: 'OHK-1835',
    title: 'Invalid time value',
    type: 'RangeError',
    location: 'src/utils/formatDate.js:12',
    project: 'dashboard',
    environment: 'production',
    browser: 'Edge 129.0',
    users: 3,
    events: 8,
    time: '3 hrs ago',
    status: 'resolved',
    color: 'green',
  },
]

const navItems = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Issues', icon: 'warning', count: '12' },
  { label: 'Activity', icon: 'activity' },
]

function Icon({ name, size = 18, ...props }) {
  const paths = {
    activity: <><path d="M3 12h4l3-8 4 16 3-8h4" /></>,
    arrowDown: <><path d="M7 10l5 5 5-5" /></>,
    arrowDownRight: <><path d="M7 7 17 17M7 17h10V7" /></>,
    arrowUpRight: <><path d="M7 17 17 7M7 7h10v10" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    code: <><path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" /></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    filter: <><path d="M4 7h16M7 12h10m-7 5h4" /><circle cx="8" cy="7" r="1" /><circle cx="15" cy="12" r="1" /></>,
    grid: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="5" rx="2" /><rect x="13" y="10" width="8" height="11" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1A7 7 0 0 1 9 13l-1.8-.3V9.9L9 9.6a7 7 0 0 1 .3-1.5L7.9 7l1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7L21.2 7l-1.4 1.1a7 7 0 0 1 .3 1.5l1.8.3v2.8l-1.8.3a7 7 0 0 1-.7 2Z" /></>,
    warning: <><path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 4h.01" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

function Chart() {
  return (
    <div className="chart-wrap" aria-label="Error events over the last 24 hours">
      <div className="chart-y-labels" aria-hidden="true">
        <span>600</span><span>450</span><span>300</span><span>150</span><span>0</span>
      </div>
      <svg className="chart" viewBox="0 0 900 190" role="img" aria-label="Error volume rose to a peak around 2 PM and is now declining">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7468f0" stopOpacity=".2" />
            <stop offset="100%" stopColor="#7468f0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="chart-grid" d="M0 10H900M0 52H900M0 94H900M0 136H900M0 178H900" />
        <path
          className="chart-area"
          d="M0 151 C35 147 47 128 78 132 S125 151 158 130 S208 112 238 119 S286 133 318 99 S364 82 398 92 S450 112 478 76 S522 61 557 82 S604 104 637 61 S681 51 717 66 S761 85 795 43 S847 39 900 19 L900 178 L0 178Z"
        />
        <path
          className="chart-line"
          d="M0 151 C35 147 47 128 78 132 S125 151 158 130 S208 112 238 119 S286 133 318 99 S364 82 398 92 S450 112 478 76 S522 61 557 82 S604 104 637 61 S681 51 717 66 S761 85 795 43 S847 39 900 19"
        />
        <line className="chart-marker" x1="795" x2="795" y1="10" y2="178" />
        <circle className="chart-point" cx="795" cy="43" r="5" />
      </svg>
      <div className="chart-x-labels" aria-hidden="true">
        <span>12 AM</span><span>4 AM</span><span>8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span><span>Now</span>
      </div>
    </div>
  )
}

function App() {
  const [issues, setIssues] = useState(initialIssues)
  const [activeNav, setActiveNav] = useState('Overview')
  const [statusFilter, setStatusFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [timeRange, setTimeRange] = useState('24 hours')
  const [lastUpdated, setLastUpdated] = useState('just now')
  const [notice, setNotice] = useState('')

  const filteredIssues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return issues.filter((issue) => {
      const matchesStatus = statusFilter === 'all' || issue.status === statusFilter
      const matchesQuery = !normalizedQuery || [
        issue.title,
        issue.type,
        issue.location,
        issue.project,
        issue.id,
      ].some((value) => value.toLowerCase().includes(normalizedQuery))
      return matchesStatus && matchesQuery
    })
  }, [issues, query, statusFilter])

  const unresolvedCount = issues.filter((issue) => issue.status === 'unresolved').length

  function refreshData() {
    setLastUpdated(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
  }

  function toggleResolved(issue) {
    const nextStatus = issue.status === 'resolved' ? 'unresolved' : 'resolved'
    setIssues((currentIssues) =>
      currentIssues.map((currentIssue) =>
        currentIssue.id === issue.id ? { ...currentIssue, status: nextStatus } : currentIssue,
      ),
    )
    setSelectedIssue({ ...issue, status: nextStatus })
  }

  async function copyIssueId(issueId) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(issueId)
        setNotice(`${issueId} copied to clipboard`)
      } catch {
        setNotice('Could not copy the issue ID. Check clipboard permissions and try again.')
      }
    } else {
      setNotice('Clipboard access is unavailable in this browser.')
    }
    window.setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Ohaki home" onClick={() => setActiveNav('Overview')}>
          <BrandMark />
          <span>ohaki</span>
        </a>

        <button className="project-switcher" type="button" aria-label="Current project: Acme Inc">
          <span className="project-avatar">A</span>
          <span className="project-switcher-copy"><strong>Acme Inc</strong><small>Workspace</small></span>
          <Icon name="arrowDown" size={15} />
        </button>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              type="button"
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.label === 'Issues' && <span className="nav-count">{unresolvedCount}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-label projects-label">PROJECTS <button type="button" aria-label="Add project"><Icon name="plus" size={15} /></button></div>
        <button className="project-link selected" type="button"><span className="project-dot violet" />Web application</button>
        <button className="project-link" type="button"><span className="project-dot mint" />Dashboard</button>

        <div className="sidebar-bottom">
          <div className="usage-card">
            <div className="usage-top"><span>Event volume</span><span>68%</span></div>
            <div className="usage-meter"><span /></div>
            <small>68k of 100k events this month</small>
            <a href="#usage" onClick={(event) => event.preventDefault()}>View usage <Icon name="arrowUpRight" size={13} /></a>
          </div>
          <button className="nav-item settings-link" type="button" onClick={() => setNotice('Workspace settings are coming soon.')}>
            <Icon name="settings" size={18} /><span>Settings</span>
          </button>
          <button className="user-profile" type="button" onClick={() => setNotice('Signed in as Alex Morgan.')}>
            <span className="user-avatar">AM</span>
            <span className="user-copy"><strong>Alex Morgan</strong><small>alex@acme.co</small></span>
            <Icon name="more" size={18} />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs"><span>Acme Inc</span><Icon name="chevron" size={14} /><strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <span className="environment-pill"><span />Production</span>
            <button className="icon-button notification-button" type="button" aria-label="Notifications" onClick={() => setNotice('You’re all caught up.')}>
              <Icon name="bell" size={18} /><i />
            </button>
            <span className="topbar-divider" />
            <button className="help-button" type="button" onClick={() => setNotice('Help center is coming soon.')}>Help <span>?</span></button>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <div className="eyebrow"><span className="live-dot" /> LIVE MONITORING</div>
              <h1>{activeNav === 'Overview' ? 'Good morning, Alex' : activeNav}</h1>
              <p>{activeNav === 'Overview' ? 'Here’s what’s happening with your applications today.' : `Monitor and investigate ${activeNav.toLowerCase()} across your applications.`}</p>
            </div>
            <div className="heading-actions">
              <button className="button button-secondary" type="button" onClick={refreshData}><Icon name="refresh" size={16} /> Refresh</button>
              <button className="button button-primary" type="button" onClick={() => setNotice('Your project setup guide is ready in Settings.')}><Icon name="plus" size={16} /> Add project</button>
            </div>
          </section>

          <section className="metrics-grid" aria-label="Error metrics">
            <article className="metric-card">
              <div className="metric-top"><span>Total events</span><span className="metric-icon purple-icon"><Icon name="activity" size={17} /></span></div>
              <div className="metric-value">1,284 <span className="metric-change positive"><Icon name="arrowUpRight" size={13} /> 12.8%</span></div>
              <div className="metric-foot">Compared to previous period</div>
              <div className="mini-bars bars-purple" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Unresolved issues</span><span className="metric-icon coral-icon"><Icon name="warning" size={17} /></span></div>
              <div className="metric-value">{unresolvedCount + 7} <span className="metric-change negative"><Icon name="arrowUpRight" size={13} /> 3 new</span></div>
              <div className="metric-foot">Across 2 projects</div>
              <div className="mini-bars bars-coral" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Users affected</span><span className="metric-icon blue-icon"><Icon name="grid" size={17} /></span></div>
              <div className="metric-value">52 <span className="metric-change positive"><Icon name="arrowDownRight" size={13} /> 8.2%</span></div>
              <div className="metric-foot">Unique users this period</div>
              <div className="mini-bars bars-blue" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Crash-free sessions</span><span className="metric-icon green-icon"><Icon name="check" size={17} /></span></div>
              <div className="metric-value">99.2<span className="value-unit">%</span> <span className="metric-change positive"><Icon name="arrowUpRight" size={13} /> 0.4%</span></div>
              <div className="metric-foot">Your apps are looking healthy</div>
              <div className="mini-bars bars-green" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
          </section>

          <section className="panel trend-panel">
            <div className="panel-heading">
              <div><h2>Error events</h2><p>Event volume across all projects</p></div>
              <div className="trend-tools"><span className="chart-legend"><i /> Errors</span><label className="select-wrap"><span className="sr-only">Chart time range</span><select value={timeRange} onChange={(event) => setTimeRange(event.target.value)}><option>24 hours</option><option>7 days</option><option>30 days</option></select><Icon name="arrowDown" size={14} /></label></div>
            </div>
            <div className="chart-summary"><strong>1,284</strong><span>events</span><span className="summary-separator" /><span className="summary-positive"><Icon name="arrowUpRight" size={13} /> 12.8%</span><span className="summary-compare">vs. previous {timeRange.toLowerCase()}</span></div>
            <Chart />
          </section>

          <section className="panel issues-panel">
            <div className="panel-heading issue-heading">
              <div><h2>Recent issues <span className="heading-count">{unresolvedCount + 7}</span></h2><p>The latest errors from your applications</p></div>
              <div className="issue-tools">
                <label className="search-field"><Icon name="search" size={16} /><input type="search" placeholder="Search issues..." value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search issues" /><kbd>⌘ K</kbd></label>
                <button className="filter-button" type="button" onClick={() => setStatusFilter((current) => current === 'all' ? 'unresolved' : current === 'unresolved' ? 'resolved' : 'all')} aria-label={`Filter: ${statusFilter}`}><Icon name="filter" size={16} /><span>{statusFilter === 'all' ? 'Filter' : statusFilter === 'unresolved' ? 'Unresolved' : 'Resolved'}</span><Icon name="arrowDown" size={14} /></button>
              </div>
            </div>
            <div className="issue-table-wrap">
              <table className="issue-table">
                <thead><tr><th>ISSUE</th><th>PROJECT</th><th>EVENTS</th><th>LAST SEEN</th><th>STATUS</th><th><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr key={issue.id} onClick={() => setSelectedIssue(issue)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setSelectedIssue(issue) }}>
                      <td><div className="issue-title-cell"><span className={`issue-type-icon ${issue.color}`}><Icon name={issue.type === 'TypeError' ? 'warning' : 'code'} size={15} /></span><span className="issue-title-copy"><strong>{issue.title}</strong><small><span className="issue-id">{issue.id}</span><span className="issue-dot-separator">·</span>{issue.type} <span className="issue-dot-separator">·</span> {issue.location}</small></span></div></td>
                      <td><span className="project-tag"><i className={`project-dot ${issue.project === 'web-app' ? 'violet' : 'mint'}`} />{issue.project}</span></td>
                      <td className="event-count">{issue.events.toLocaleString()}</td>
                      <td className="last-seen"><Icon name="clock" size={14} />{issue.time}</td>
                      <td><span className={`status-pill ${issue.status}`}><i />{issue.status === 'unresolved' ? 'Unresolved' : 'Resolved'}</span></td>
                      <td><button className="row-more" aria-label={`More actions for ${issue.id}`} type="button" onClick={(event) => { event.stopPropagation(); setSelectedIssue(issue) }}><Icon name="more" size={17} /></button></td>
                    </tr>
                  ))}
                  {filteredIssues.length === 0 && <tr><td className="empty-state" colSpan="6"><Icon name="search" size={22} /><strong>No issues found</strong><span>Try a different search or status filter.</span></td></tr>}
                </tbody>
              </table>
            </div>
            <div className="table-footer"><span>Showing <strong>{filteredIssues.length}</strong> of <strong>{issues.length}</strong> issues <span className="footer-dot">·</span> Updated {lastUpdated}</span><button type="button" onClick={() => setActiveNav('Issues')}>View all issues <Icon name="arrowUpRight" size={14} /></button></div>
          </section>

          <footer className="page-footer"><span>Made for teams who ship.</span><span><span className="footer-status-dot" /> All systems operational <span className="footer-dot">·</span> Ohaki v1.0</span></footer>
        </div>
      </main>

      {selectedIssue && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedIssue(null) }}>
          <section className="issue-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
            <div className="drawer-top"><span className="drawer-label">ISSUE DETAILS</span><button className="icon-button" type="button" onClick={() => setSelectedIssue(null)} aria-label="Close issue details"><Icon name="close" size={18} /></button></div>
            <div className="drawer-issue-icon"><Icon name={selectedIssue.type === 'TypeError' ? 'warning' : 'code'} size={19} /></div>
            <h2 id="drawer-title">{selectedIssue.title}</h2>
            <div className="drawer-id-row"><span>{selectedIssue.id}</span><button className="copy-button" type="button" onClick={() => copyIssueId(selectedIssue.id)}><Icon name="copy" size={14} /> Copy ID</button></div>
            <div className="drawer-status-row"><span className={`status-pill ${selectedIssue.status}`}><i />{selectedIssue.status === 'unresolved' ? 'Unresolved' : 'Resolved'}</span><span className="drawer-type">{selectedIssue.type}</span></div>
            <div className="drawer-divider" />
            <h3>Issue overview</h3>
            <dl className="issue-details">
              <div><dt>Project</dt><dd>{selectedIssue.project}</dd></div>
              <div><dt>Environment</dt><dd><span className="environment-pill compact"><i />{selectedIssue.environment}</span></dd></div>
              <div><dt>First seen</dt><dd>Today, 9:42 AM</dd></div>
              <div><dt>Last seen</dt><dd>{selectedIssue.time}</dd></div>
              <div><dt>Events</dt><dd>{selectedIssue.events} <span className="detail-muted">in the last 24 hours</span></dd></div>
              <div><dt>Users affected</dt><dd>{selectedIssue.users}</dd></div>
              <div><dt>Browser</dt><dd>{selectedIssue.browser}</dd></div>
            </dl>
            <div className="drawer-divider" />
            <h3>Stack location</h3>
            <div className="stack-location"><Icon name="code" size={15} /><code>{selectedIssue.location}</code><Icon name="arrowUpRight" size={14} /></div>
            <pre className="stack-preview"><span>at</span> renderProjectCard (ProjectCard.jsx:42:18){'\n'}<span>at</span> renderWithHooks (react-dom.js:15486:18){'\n'}<span>at</span> mountIndeterminateComponent (react-dom.js:20103:13)</pre>
            <button className={`button ${selectedIssue.status === 'unresolved' ? 'button-primary' : 'button-secondary'} resolve-button`} type="button" onClick={() => toggleResolved(selectedIssue)}><Icon name="check" size={16} />{selectedIssue.status === 'unresolved' ? 'Mark as resolved' : 'Reopen issue'}</button>
          </section>
        </div>
      )}

      {notice && <div className="toast" role="status"><Icon name="check" size={16} />{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss notification"><Icon name="close" size={14} /></button></div>}
    </div>
  )
}

export default App
