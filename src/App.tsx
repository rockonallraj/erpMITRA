import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight, Bell, BookOpen, BusFront, CalendarCheck2, CalendarDays,
  ChevronDown, ClipboardPenLine, Download, FileText, GraduationCap,
  LayoutDashboard, Menu, MoreHorizontal, PackageCheck, Plus, Search,
  Settings2, ShieldCheck, Sparkles, Sun, UserRoundCheck, Users, WalletCards, X,
} from 'lucide-react'
import './App.css'

type Icon = typeof LayoutDashboard

const navItems: { label: string; icon: Icon; badge?: string }[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Students & Parents', icon: Users, badge: '24' },
  { label: 'Staff & Teachers', icon: UserRoundCheck },
  { label: 'Attendance', icon: CalendarCheck2 },
  { label: 'Fees & Accounts', icon: WalletCards },
  { label: 'Exams & Results', icon: ClipboardPenLine },
  { label: 'Transport', icon: BusFront },
]

const kpis = [
  { label: 'Total students', value: '2,486', change: '+6.4%', icon: GraduationCap, tone: 'teal' },
  { label: "Today's attendance", value: '94.8%', change: '+2.8%', icon: CalendarCheck2, tone: 'blue' },
  { label: 'Fee collection', value: '₹18.42L', change: '+11.2%', icon: WalletCards, tone: 'amber' },
  { label: 'Active staff', value: '148', change: '+4.1%', icon: UserRoundCheck, tone: 'coral' },
]

const attendanceBars = [78, 84, 81, 92, 87, 95, 89, 83, 96, 91, 97, 94]

const activities = [
  { title: 'Attendance synced', detail: 'Class 8A · 42 students marked present', time: '12 min ago', icon: CalendarCheck2, tone: 'teal' },
  { title: 'New admission approved', detail: 'Aarav Mehta · Grade 6 · ADM-2486', time: '38 min ago', icon: GraduationCap, tone: 'blue' },
  { title: 'School bus reached stop', detail: 'Route 04 · Sector 18 · 28 students', time: '1 hr ago', icon: BusFront, tone: 'amber' },
  { title: 'Fee payment received', detail: 'Riya Sharma · Term 2 · ₹24,500', time: '2 hrs ago', icon: WalletCards, tone: 'coral' },
]

const notices = [
  { title: 'PTM schedule published', detail: 'Saturday, 28 Sep · All classes', tone: 'healthy' },
  { title: 'Grade 10 exam forms', detail: '18 forms pending approval', tone: 'watch' },
  { title: 'Bus route 07 renewal', detail: 'Renewal due in 5 days', tone: 'low' },
]

function App() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [range, setRange] = useState('This academic year')
  const [darkMode, setDarkMode] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [query, setQuery] = useState('')

  const filteredNotices = useMemo(
    () => notices.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const selectNav = (label: string) => {
    setActiveNav(label)
    setMobileNav(false)
  }

  return (
    <div className={`app-shell ${darkMode ? 'dark' : ''}`}>
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Sparkles size={18} /></div><span>Anvi <b>Mitra</b><small>ERP</small></span></div>
        <div className="workspace-switcher"><div className="workspace-avatar">SP</div><div><strong>Sunrise Public School</strong><span>School admin workspace</span></div><ChevronDown size={15} /></div>
        <nav className="main-nav" aria-label="School ERP navigation">
          <span className="nav-label">School management</span>
          {navItems.map(({ label, icon: NavIcon, badge }) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => selectNav(label)}><NavIcon size={18} /><span>{label}</span>{badge && <em>{badge}</em>}</button>)}
          <span className="nav-label secondary">Digital services</span>
          <button className="nav-item" onClick={() => selectNav('Reports')}><FileText size={18} /><span>Reports & Analytics</span></button>
          <button className="nav-item" onClick={() => selectNav('Website & App')}><BookOpen size={18} /><span>Website & App</span></button>
          <button className="nav-item" onClick={() => selectNav('Settings')}><Settings2 size={18} /><span>Settings</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="support-card"><div className="pulse-dot" /><div><strong>Cloud sync operational</strong><span>Offline data backed up 2m ago</span></div></div><div className="profile"><div className="profile-avatar">JS</div><div><strong>Jai Sanwariya</strong><span>Super Admin</span></div><MoreHorizontal size={18} /></div></div>
      </aside>

      <main className="content">
        <header className="topbar"><button className="icon-button menu-button" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={21} /></button><div className="breadcrumbs"><span>Sunrise Public School</span><span>/</span><strong>{activeNav}</strong></div><div className="topbar-actions"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search students, staff..." /><kbd>⌘ K</kbd></label><button className="icon-button" aria-label="Toggle theme" onClick={() => setDarkMode((value) => !value)}>{darkMode ? <Sun size={19} /> : <Sparkles size={19} />}</button><div className="notification-wrap"><button className="icon-button" aria-label="Notifications" onClick={() => setShowNotifications((value) => !value)}><Bell size={19} /><i /></button><AnimatePresence>{showNotifications && <motion.div className="notification-popover" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><strong>School alerts</strong><p>3 updates need your attention.</p><button onClick={() => setShowNotifications(false)}>View all alerts <ArrowUpRight size={14} /></button></motion.div>}</AnimatePresence></div><div className="profile-avatar top-avatar">JS</div></div></header>

        <div className="page-wrap">
          <div className="page-heading"><div><p className="eyebrow">Thursday, September 25, 2026 <span className="live-dot" /> School day in progress</p><h1>Good morning, Jai <span className="wave">✦</span></h1><p className="subheading">Your school's complete digital command center for a brighter future.</p></div><div className="heading-actions"><div className="select-control"><CalendarDays size={16} /><select value={range} onChange={(event) => setRange(event.target.value)}><option>This academic year</option><option>This month</option><option>This week</option></select><ChevronDown size={15} /></div><button className="primary-button" onClick={() => setShowModal(true)}><Plus size={17} /> Quick action</button></div></div>

          <section className="kpi-grid">{kpis.map(({ label, value, change, icon: KpiIcon, tone }, index) => <motion.article className="kpi-card" key={label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}><div className={`kpi-icon ${tone}`}><KpiIcon size={19} /></div><div className="kpi-info"><span>{label}</span><strong>{value}</strong><small><ArrowUpRight size={13} /> {change} <em>vs last period</em></small></div><button className="more-button" aria-label={`More ${label} options`}><MoreHorizontal size={18} /></button></motion.article>)}</section>

          <section className="dashboard-grid"><article className="panel revenue-panel"><div className="panel-heading"><div><span className="section-kicker">Student engagement</span><h2>Attendance overview</h2></div><button className="more-button" aria-label="More attendance options"><MoreHorizontal size={18} /></button></div><div className="revenue-summary"><strong>94.8%</strong><span className="positive"><ArrowUpRight size={15} /> 2.8%</span><small>Average attendance this month</small></div><div className="chart"><div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-area"><div className="grid-lines" />{attendanceBars.map((height, index) => <motion.div className={`bar ${index === 10 ? 'highlighted' : ''}`} key={index} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 0.8, delay: index * 0.04 }}><span>{index === 10 ? '97% today' : ''}</span></motion.div>)}<div className="chart-x"><span>Aug 01</span><span>Aug 08</span><span>Aug 15</span><span>Aug 22</span><span>Aug 29</span></div></div></div></article><article className="panel goal-panel"><div className="panel-heading"><div><span className="section-kicker">Fee collection</span><h2>Term 2 progress</h2></div><button className="more-button" aria-label="More fee options"><MoreHorizontal size={18} /></button></div><div className="goal-ring"><div><strong>82<span>%</span></strong><small>collected</small></div></div><p className="goal-copy">Fee collection is ahead of the target for this term.</p><div className="goal-meta"><span>Collected <strong>₹18.42L</strong></span><span>Target <strong>₹22.4L</strong></span></div><div className="progress-track"><motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1 }} /></div><button className="text-button">Open fee report <ArrowUpRight size={15} /></button></article></section>

          <section className="lower-grid"><article className="panel activity-panel"><div className="panel-heading"><div><span className="section-kicker">Live feed</span><h2>School activity</h2></div><button className="text-button">View all <ArrowUpRight size={15} /></button></div><div className="activity-list">{activities.map(({ title, detail, time, icon: ActivityIcon, tone }) => <div className="activity-item" key={title}><div className={`activity-icon ${tone}`}><ActivityIcon size={17} /></div><div className="activity-copy"><strong>{title}</strong><span>{detail}</span></div><time>{time}</time></div>)}</div></article><article className="panel inventory-panel"><div className="panel-heading"><div><span className="section-kicker">Needs attention</span><h2>Important notices</h2></div><button className="text-button">Manage <ArrowUpRight size={15} /></button></div><div className="inventory-list">{filteredNotices.map(({ title, detail, tone }) => <div className="inventory-item" key={title}><div className="inventory-title"><div><strong>{title}</strong><span>{detail}</span></div><span className={`status ${tone}`}><i />{tone === 'healthy' ? 'On track' : tone === 'watch' ? 'Pending' : 'Due soon'}</span></div><div className="notice-line"><div className={tone} /></div></div>)}</div></article></section>

          <section className="module-strip"><div><ShieldCheck size={18} /><strong>Secure cloud</strong><span>Encrypted records</span></div><div><PackageCheck size={18} /><strong>Offline access</strong><span>Keep teaching anywhere</span></div><div><BusFront size={18} /><strong>Live tracking</strong><span>Safe school transport</span></div><div><BookOpen size={18} /><strong>Website + App</strong><span>One connected campus</span></div></section>
          <footer><span><span className="footer-mark">✦</span> Anvi Mitra ERP</span><span>School data synced 2 minutes ago <span className="sync-dot" /></span><button aria-label="Download report"><Download size={15} /> Export report</button></footer>
        </div>
      </main>

      <AnimatePresence>{showModal && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}><motion.div className="modal" initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div><span className="section-kicker">School management</span><h2>Create new entry</h2></div><button className="icon-button" onClick={() => setShowModal(false)} aria-label="Close"><X size={19} /></button></div><div className="entry-options"><button onClick={() => setShowModal(false)}><GraduationCap size={20} /><strong>New admission</strong><span>Register a student and guardian</span></button><button onClick={() => setShowModal(false)}><CalendarCheck2 size={20} /><strong>Mark attendance</strong><span>Update class attendance records</span></button><button onClick={() => setShowModal(false)}><WalletCards size={20} /><strong>Record fee payment</strong><span>Add a student fee receipt</span></button><button onClick={() => setShowModal(false)}><ClipboardPenLine size={20} /><strong>Enter marks</strong><span>Update exam results securely</span></button></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  )
}

export default App
