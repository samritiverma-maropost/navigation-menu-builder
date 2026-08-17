const { useState, useMemo, useRef, useEffect } = React;

const RESOURCE_TYPES = [
  "Custom URL",
  "Collection",
  "Category",
  "Home page",
  "Pages",
  "Blogs",
  "Search",
  "Products",
];

const PICKER_TYPES = ["Collection", "Category", "Pages", "Blogs"];
const ROWS_OPTIONS = [10, 25, 50, 100];
const IMG_SRC_TABS = [
  { value: "Collection", label: "Resource Image" },
  { value: "Custom", label: "Custom" },
  { value: "None", label: "None" },
];

const IMAGE_NOTES = {
  Collection:
    "Uses the collection’s featured image on mega-menu tiles. Falls back to text if the collection has no image.",
  Custom: "Upload a custom image for this menu item’s mega-menu tile.",
  None: "No image on this item. Mega menu shows text only for this link (no feature tile image).",
};

const RAIL = [
  { id: "dashboard", src: "icons/dashboard.svg", label: "Dashboard" },
  { id: "theme", src: "icons/theme.svg", label: "Theme" },
  { id: "pages", src: "icons/pages.svg", label: "Pages" },
  { id: "blogs", src: "icons/blogs.svg", label: "Blogs" },
  { id: "nav", src: "icons/navigation.svg", label: "Navigation", active: true },
  { id: "campaigns", src: "icons/campaigns.svg", label: "Campaigns" },
  { id: "content", src: "icons/content.svg", label: "Content" },
  { id: "integrations", src: "icons/integrations.svg", label: "Integrations" },
  { id: "settings", src: "icons/settings-rail.svg", label: "Settings" },
];

const CATALOG = {
  Collection: [
    { id: "c-furn", name: "Furniture", children: [
      { id: "c-sofas", name: "Sofas", children: [
        { id: "c-seats", name: "Seats", children: [] },
        { id: "c-3s", name: "3 Seater", children: [] },
        { id: "c-2s", name: "2 Seater", children: [] },
        { id: "c-sect", name: "Sectional", children: [] },
      ]},
      { id: "c-tables", name: "Tables", children: [
        { id: "c-coffee", name: "Coffee tables", children: [] },
        { id: "c-dine", name: "Dining tables", children: [] },
        { id: "c-side", name: "Side tables", children: [] },
      ]},
      { id: "c-beds", name: "Beds", children: [
        { id: "c-plat", name: "Platform beds", children: [] },
        { id: "c-uph", name: "Upholstered beds", children: [] },
      ]},
      { id: "c-storage", name: "Storage", children: [
        { id: "c-book", name: "Bookcases", children: [] },
        { id: "c-sideb", name: "Sideboards", children: [] },
      ]},
    ]},
    { id: "c-out", name: "Outdoor", children: [
      { id: "c-patio", name: "Patio", children: [
        { id: "c-lounge-set", name: "Lounge sets", children: [] },
        { id: "c-out-dining", name: "Outdoor dining", children: [] },
      ]},
      { id: "c-garden", name: "Garden", children: [
        { id: "c-umb", name: "Umbrellas", children: [] },
        { id: "c-planters", name: "Planters", children: [] },
      ]},
    ]},
    { id: "c-new", name: "New arrivals", children: [
      { id: "c-spring", name: "Spring edit", children: [
        { id: "c-feat-sofa", name: "Featured sofas", children: [] },
        { id: "c-feat-light", name: "Featured lighting", children: [] },
      ]},
      { id: "c-landed", name: "Just landed", children: [
        { id: "c-new-out", name: "New outdoor", children: [] },
      ]},
    ]},
    { id: "c-best", name: "Best sellers", children: [
      { id: "c-top-sofas", name: "Top sofas", children: [
        { id: "c-best-3s", name: "3 Seater bestsellers", children: [] },
      ]},
      { id: "c-top-tables", name: "Top tables", children: [
        { id: "c-best-dine", name: "Dining bestsellers", children: [] },
      ]},
    ]},
    { id: "c-living", name: "Living room", children: [
      { id: "c-packages", name: "Lounge packages", children: [
        { id: "c-sofa-coffee", name: "Sofa + coffee table", children: [] },
      ]},
      { id: "c-accent", name: "Accent", children: [
        { id: "c-accent-side", name: "Side tables", children: [] },
        { id: "c-accent-lamp", name: "Lamps", children: [] },
      ]},
    ]},
  ],
  Category: [
    { id: "k-furn", name: "Furniture", children: [
      { id: "k-sofas", name: "Sofas", children: [
        { id: "k-seats", name: "Seats", children: [] },
        { id: "k-3s", name: "3 Seater", children: [] },
        { id: "k-2s", name: "2 Seater", children: [] },
        { id: "k-corner", name: "Corner Sofa", children: [] },
      ]},
      { id: "k-tables", name: "Tables", children: [
        { id: "k-coffee", name: "Coffee Table", children: [] },
        { id: "k-dine", name: "Dinning Table", children: [] },
        { id: "k-side", name: "Side Table", children: [] },
        { id: "k-console", name: "Console Table", children: [] },
      ]},
      { id: "k-beds", name: "Beds", children: [
        { id: "k-king", name: "King Bed", children: [] },
        { id: "k-queen", name: "Queen Bed", children: [] },
        { id: "k-bedside", name: "Bedside", children: [] },
      ]},
      { id: "k-storage", name: "Storage", children: [
        { id: "k-book", name: "Bookcases", children: [] },
        { id: "k-sideboard", name: "Sideboards", children: [] },
        { id: "k-ward", name: "Wardrobes", children: [] },
      ]},
    ]},
    { id: "k-out", name: "Outdoor", children: [
      { id: "k-out-sofa", name: "Outdoor Sofa", children: [
        { id: "k-lounge", name: "Lounge Setting", children: [] },
        { id: "k-out-chair", name: "Outdoor Armchair", children: [] },
      ]},
      { id: "k-out-table", name: "Outdoor Table", children: [
        { id: "k-out-dine", name: "Dining Setting", children: [] },
        { id: "k-bar", name: "Bar Table", children: [] },
      ]},
      { id: "k-umb", name: "Umbrellas", children: [
        { id: "k-cant", name: "Cantilever", children: [] },
        { id: "k-market", name: "Market Umbrella", children: [] },
        { id: "k-patio", name: "Patio", children: [] },
      ]},
    ]},
    { id: "k-light", name: "Lighting", children: [
      { id: "k-ceil", name: "Ceiling", children: [
        { id: "k-pend", name: "Pendants", children: [] },
        { id: "k-chand", name: "Chandeliers", children: [] },
      ]},
      { id: "k-floor", name: "Floor Lamps", children: [
        { id: "k-arc", name: "Arc Lamp", children: [] },
        { id: "k-tripod", name: "Tripod Lamp", children: [] },
      ]},
      { id: "k-tlamp", name: "Table Lamps", children: [
        { id: "k-ceramic", name: "Ceramic Base", children: [] },
        { id: "k-desk", name: "Desk Lamp", children: [] },
      ]},
    ]},
    { id: "k-bedrm", name: "Bedroom", children: [
      { id: "k-matt", name: "Mattresses", children: [
        { id: "k-pocket", name: "Pocket Spring", children: [] },
        { id: "k-foam", name: "Foam", children: [] },
      ]},
      { id: "k-bedding", name: "Bedding", children: [
        { id: "k-duvet", name: "Duvet Covers", children: [] },
        { id: "k-sheets", name: "Sheet Sets", children: [] },
      ]},
    ]},
    { id: "k-decor", name: "Decor", children: [
      { id: "k-rugs", name: "Rugs", children: [
        { id: "k-runner", name: "Runner", children: [] },
        { id: "k-area", name: "Area Rug", children: [] },
      ]},
      { id: "k-cush", name: "Cushions", children: [
        { id: "k-scatter", name: "Scatter", children: [] },
        { id: "k-out-cush", name: "Outdoor Cushion", children: [] },
      ]},
    ]},
    { id: "k-sale", name: "Sale", children: [
      { id: "k-clr-sofa", name: "Clearance Sofas", children: [
        { id: "k-floor-3s", name: "Floor Stock 3 Seater", children: [] },
      ]},
      { id: "k-weekend", name: "Weekend Deals", children: [
        { id: "k-md-table", name: "Marked Down Tables", children: [] },
        { id: "k-light-sale", name: "Lighting Sale", children: [] },
      ]},
    ]},
  ],
  Pages: [
    { id: "p-home", name: "Home", children: [] },
    { id: "p-about", name: "About", children: [] },
    { id: "p-contact", name: "Contact", children: [] },
    { id: "p-blog", name: "Blog", children: [
      { id: "p-news", name: "News", children: [] },
      { id: "p-stories", name: "Stories", children: [] },
    ]},
  ],
  Blogs: [
    { id: "b-journal", name: "Journal", children: [
      { id: "b-spring", name: "Spring", children: [] },
      { id: "b-summer", name: "Summer", children: [] },
    ]},
    { id: "b-news", name: "News", children: [] },
  ],
};

let nid = 100;
const uid = () => "n" + nid++;

function walk(nodes, fn, parent = null, depth = 1) {
  (nodes || []).forEach((n) => {
    fn(n, parent, depth);
    if (n.children) walk(n.children, fn, n, depth + 1);
  });
}
function stampKids(nodes) {
  (nodes || []).forEach((n) => {
    stampKids(n.children);
    n.kids = (n.children || []).reduce((sum, c) => sum + 1 + (c.kids || 0), 0);
  });
}
Object.keys(CATALOG).forEach((k) => stampKids(CATALOG[k]));

function flatten(nodes) {
  const out = [];
  walk(nodes, (n, parent, depth) => out.push({ ...n, parentId: parent && parent.id, depth }));
  return out;
}

function locate(nodes, id, parent) {
  parent = parent || null;
  for (let i = 0; i < (nodes || []).length; i++) {
    if (nodes[i].id === id) return { list: nodes, index: i, parent };
    const found = locate(nodes[i].children || [], id, nodes[i]);
    if (found) return found;
  }
  return null;
}

function includedLabel(n) {
  const desc = countDesc(n);
  if (!(n.children || []).length) return "—";
  if (n.childTotal) {
    const cats = (n.children || []).filter((c) => (c.children || []).length).length;
    if (cats) return desc + " of " + n.childTotal + "  (" + cats + " " + (cats === 1 ? "category" : "categories") + ")";
    return desc + " of " + n.childTotal;
  }
  return String(desc);
}

function findNode(nodes, id) {
  let found = null;
  walk(nodes, (n) => { if (n.id === id) found = n; });
  return found;
}

function mapTree(nodes, fn) {
  return (nodes || []).map((n) => fn({ ...n, children: n.children ? mapTree(n.children, fn) : [] }));
}

function insertChild(nodes, parentId, child) {
  return (nodes || []).map((n) => n.id === parentId
    ? { ...n, children: [...(n.children || []), child] }
    : { ...n, children: insertChild(n.children || [], parentId, child) });
}

function addTipSeen() {
  try { return localStorage.getItem("nm-add-placement-tip") === "1"; } catch (e) { return true; }
}
function markAddTipSeen() {
  try { localStorage.setItem("nm-add-placement-tip", "1"); } catch (e) {}
}

function ancestorsOf(nodes, id) {
  const flat = flatten(nodes);
  const byId = Object.fromEntries(flat.map((n) => [n.id, n]));
  const chain = [];
  let cur = byId[id];
  while (cur && cur.parentId) {
    cur = byId[cur.parentId];
    if (cur) chain.push(cur.id);
  }
  return chain;
}

function catalogAncestors(kind, id) {
  const chain = [];
  function search(nodes, parents) {
    for (const n of nodes || []) {
      if (n.id === id) {
        chain.push(...parents);
        return true;
      }
      if (search(n.children, [...parents, n.id])) return true;
    }
    return false;
  }
  search(CATALOG[kind] || [], []);
  return chain;
}

function descendantsOf(node) {
  const ids = [];
  walk(node.children || [], (n) => ids.push(n.id));
  return ids;
}

function countDesc(node) {
  let n = 0;
  walk(node.children || [], () => { n += 1; });
  return n;
}

function subtitle(item) {
  if (item.resourceType === "Custom URL") return `Custom - ${item.linkTo || "/"}`;
  if (item.linkedLabel) return `${item.resourceType === "Pages" || item.resourceType === "Blogs" ? item.resourceType : item.resourceType === "Category" ? "Collection" : item.resourceType} - ${item.linkedLabel}`;
  return `${item.resourceType} -`;
}

function item(partial) {
  return {
    id: uid(),
    name: "New Page",
    resourceType: "Custom URL",
    linkTo: "/",
    linkedLabel: "",
    linkedIds: [],
    imageSource: "None",
    hidden: false,
    includeChildren: false,
    customImage: "",
    children: [],
    ...partial,
  };
}

function sampleFurniture() {
  nid = 200;
  const seats = item({ name: "Seats", resourceType: "Category", linkedLabel: "Seats", linkedIds: ["k-seats"], imageSource: "Collection" });
  const seater = item({ name: "3 Seater", resourceType: "Category", linkedLabel: "3 Seater", linkedIds: ["k-3s"], imageSource: "Collection" });
  const coffee = item({ name: "Coffee tables", resourceType: "Category", linkedLabel: "Coffee tables", linkedIds: ["k-coffee"], imageSource: "Collection" });
  const patio = item({ name: "Patio", resourceType: "Category", linkedLabel: "Patio", linkedIds: ["k-patio"], imageSource: "Collection" });
  const sofas = item({
    name: "Sofas",
    resourceType: "Category",
    linkedLabel: "Sofas",
    linkedIds: ["k-sofas"],
    imageSource: "Collection",
    includeChildren: true,
    childTotal: 4,
    children: [seats, seater],
  });
  const tables = item({
    name: "Tables",
    resourceType: "Category",
    linkedLabel: "Tables",
    linkedIds: ["k-tables"],
    imageSource: "Collection",
    includeChildren: false,
    childTotal: 4,
    children: [coffee],
  });
  const outdoor = item({
    name: "Outdoor",
    resourceType: "Category",
    linkedLabel: "Outdoor",
    linkedIds: ["k-out"],
    imageSource: "Collection",
    includeChildren: false,
    childTotal: 10,
    children: [patio],
  });
  const furniture = item({
    name: "Furniture",
    resourceType: "Category",
    linkedLabel: "Furniture",
    linkedIds: ["k-furn"],
    imageSource: "None",
    includeChildren: true,
    childTotal: 18,
    children: [sofas, tables, outdoor],
  });
  const contact = item({
    name: "Contact",
    resourceType: "Custom URL",
    linkTo: "/Contact us",
    imageSource: "None",
  });
  return [contact, furniture];
}

function useOutside(ref, onClose) {
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, onClose]);
}

function LevelPill({ depth }) {
  return <span className={`rp-level l${Math.min(depth, 3)}`}>L{Math.min(depth, 3)}</span>;
}

function Switch({ on, onToggle, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onToggle} className={`rp-switch ${on ? "on" : ""}`}>
      <i />
    </button>
  );
}

function Btn({ children, primary, onClick, className = "", disabled, ghost }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`rp-btn ${primary ? "primary" : ""} ${ghost ? "ghost" : ""} ${className}`}>
      {children}
    </button>
  );
}

function Field({ label, value, onChange, readOnly, placeholder }) {
  return (
    <label className="rp-field">
      <span>{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </label>
  );
}

function Menu({ items, onPick, active, dangerKey }) {
  return (
    <div className="rp-menu">
      {items.map((it) => (
        <button
          key={it}
          type="button"
          className={`${it === active ? "is-active" : ""} ${it === dangerKey ? "danger" : ""}`}
          onClick={() => onPick(it)}
        >
          {it}
        </button>
      ))}
    </div>
  );
}

function Shell({ children, crumb, onCrumb }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="flex min-h-screen flex-col">
      <div className="rp-proto">
        <strong>Prototype</strong>
        Stakeholder review · React + Tailwind · client state only
        <a href="index.html">Hub</a>
        <a href="https://www.figma.com/design/5Dd6KVq8SSMgZiwzPk4rsE/Navigation-menu-builder?node-id=11100-44617" target="_blank" rel="noreferrer">Figma · Design Ready</a>
      </div>
      <header className="rp-appbar">
        <div className="rp-brand">
          <img src="icons/logo.png" alt="MAROPOST" />
        </div>
        <div className="rp-search">
          <i className="mdi mdi-magnify text-[20px] text-[rgba(0,0,0,0.38)]" />
          <input placeholder="Search" />
        </div>
        <div className="rp-abar-right">
          <div className="relative">
            <button type="button" className="rp-text-btn" onClick={() => setOpen(open === "new" ? null : "new")} style={{ textTransform: "none", letterSpacing: "1.2px", fontWeight: 500, color: "rgba(0,0,0,0.87)" }}>
              <i className="mdi mdi-lightbulb-on-outline mr-1 text-[18px] align-middle" />
              What’s New?
            </button>
            {open === "new" && (
              <div className="rp-menu" style={{ right: 0, top: 44, minWidth: 220 }}>
                <button type="button">Product updates</button>
                <button type="button">Release notes</button>
              </div>
            )}
          </div>
          <div className="relative">
            <button type="button" className="rp-text-btn" onClick={() => setOpen(open === "acct" ? null : "acct")}>
              <i className="mdi mdi-domain mr-1 text-[18px] align-middle" />
              Account name is...
              <i className="mdi mdi-chevron-down ml-1" />
            </button>
            {open === "acct" && (
              <div className="rp-menu" style={{ right: 0, top: 44 }}>
                <button type="button">Account 2000293</button>
                <button type="button">Switch account</button>
              </div>
            )}
          </div>
          <button className="rp-icon-btn" type="button" aria-label="Da Vinci"><i className="mdi mdi-creation" /></button>
          <button className="rp-icon-btn" type="button" aria-label="Help"><i className="mdi mdi-book-open-variant" /></button>
          <button className="rp-icon-btn" type="button" aria-label="Settings"><i className="mdi mdi-cog-outline" /></button>
          <div className="relative">
            <button type="button" className="rp-profile" onClick={() => setOpen(open === "prof" ? null : "prof")}>
              <span className="rp-avatar"><i className="mdi mdi-account-outline" /></span>
              Acme Corp India...
              <i className="mdi mdi-chevron-down text-[18px]" />
            </button>
            {open === "prof" && (
              <div className="rp-menu" style={{ right: 0, top: 56 }}>
                <button type="button">Profile</button>
                <button type="button">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="rp-body">
        <nav className="rp-rail" aria-label="Storefront">
          <button type="button" className="rp-rail-back" aria-label="Back">
            <img src="icons/arrow-back.svg" alt="" width="16" height="16" />
          </button>
          <div className="rp-rail-num"><span>#33</span></div>
          {RAIL.map((r) => (
            <button key={r.id} type="button" className={`rp-rail-item ${r.active ? "active" : ""}`} aria-label={r.label} aria-current={r.active ? "page" : undefined}>
              <img src={r.src} alt="" />
            </button>
          ))}
        </nav>
        <main className="rp-main">
          <div className="rp-crumb">
            <button type="button" onClick={onCrumb}>Sales channel</button>
            {" > TestStore > Navigation > "}
            <span className="cur">{crumb}</span>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function ListingPage({ menus, onCreate, onOpen, onDelete }) {
  const [hoverId, setHoverId] = useState(menus[1] ? menus[1].id : null);
  const [kebab, setKebab] = useState(null);
  const [rows, setRows] = useState(10);
  const [rowsOpen, setRowsOpen] = useState(false);
  const kebabRef = useRef(null);
  useOutside(kebabRef, () => setKebab(null));

  return (
    <Shell crumb="" onCrumb={() => {}}>
      <div className="rp-head">
        <h1>Navigation</h1>
        <Btn primary onClick={onCreate}>Create a menu</Btn>
      </div>
      <div className="rp-table-wrap" style={{ boxShadow: "0 1px 1.5px rgba(0,0,0,.2), 0 2px 0.5px rgba(0,0,0,.12), 0 1px 0.5px rgba(0,0,0,.14)", borderRadius: 4, border: 0 }}>
        <table className="rp-table">
          <thead>
            <tr>
              <th>Menu Name <i className="mdi mdi-unfold-more-horizontal text-[16px] align-middle" /></th>
              <th>Menu Items <i className="mdi mdi-unfold-more-horizontal text-[16px] align-middle" /></th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((m) => {
              const limit = m.name === "Draft" ? 3 : 5;
              const extra = Math.max(0, m.preview.length - limit);
              const shown = m.preview.slice(0, limit);
              const inactive = m.status === "Inactive";
              const selected = hoverId === m.id;
              return (
                <tr
                  key={m.id}
                  onClick={() => onOpen(m.id)}
                  onMouseEnter={() => setHoverId(m.id)}
                  className={`${selected ? "is-selected is-hover" : ""} ${inactive ? "is-inactive" : ""}`}
                >
                  <td className={inactive ? "rp-name-muted" : ""}>{m.name}</td>
                  <td>
                    <div className="flex flex-wrap items-center">
                      {shown.map((t) => (
                        <span key={t} className={`rp-chip ${inactive ? "muted" : ""}`}>{t}</span>
                      ))}
                      {extra > 0 && (
                        <button type="button" className="rp-more" onClick={(e) => e.stopPropagation()}>+{extra} more</button>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className={`rp-status ${m.status === "Active" ? "ok" : "err"}`}>{m.status}</span>
                  </td>
                  <td style={{ textAlign: "right", position: "relative" }} ref={kebab === m.id ? kebabRef : null}>
                    <button
                      type="button"
                      className={`rp-kebab ${kebab === m.id || selected ? "on" : ""}`}
                      aria-label="Actions"
                      onClick={(e) => { e.stopPropagation(); setKebab(kebab === m.id ? null : m.id); }}
                    >
                      <i className="mdi mdi-dots-vertical" />
                    </button>
                    {kebab === m.id && (
                      <div className="rp-menu" style={{ right: 8, top: 48 }}>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setKebab(null); onOpen(m.id); }}>Edit</button>
                        <button type="button" className="danger" onClick={(e) => { e.stopPropagation(); setKebab(null); onDelete(m.id); }}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="rp-foot">
          <span>Rows per page:</span>
          <div className="relative">
            <button type="button" className="rp-text-btn" style={{ height: 32, letterSpacing: "0.04px", textTransform: "none", fontWeight: 400 }} onClick={() => setRowsOpen((v) => !v)}>
              {rows} <i className="mdi mdi-menu-down" />
            </button>
            {rowsOpen && (
              <div className="rp-menu" style={{ right: 0, bottom: 36 }}>
                {ROWS_OPTIONS.map((n) => (
                  <button key={n} type="button" className={n === rows ? "is-active" : ""} onClick={() => { setRows(n); setRowsOpen(false); }}>{n}</button>
                ))}
              </div>
            )}
          </div>
          <span>1–{Math.min(rows, menus.length)} of 100</span>
          <button type="button" className="rp-page-btn" disabled aria-label="Previous page"><i className="mdi mdi-chevron-left" /></button>
          <button type="button" className="rp-page-btn" aria-label="Next page"><i className="mdi mdi-chevron-right" /></button>
        </div>
      </div>
    </Shell>
  );
}

function EditorPage({ draft, setDraft, onCancel, onSave, wasLive }) {
  const [typeOpen, setTypeOpen] = useState(false);
  const [rowMenu, setRowMenu] = useState(null);
  const [picker, setPicker] = useState(null);
  const [preview, setPreview] = useState(false);
  const [toast, setToast] = useState("");
  const [alert, setAlert] = useState(null);
  const [saveConfirm, setSaveConfirm] = useState(false);
  const [treeExpanded, setTreeExpanded] = useState({});
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [flashRowId, setFlashRowId] = useState(null);
  const addRef = useRef(null);
  useOutside(addRef, () => setAddMenuOpen(false));
  const [baseline] = useState(() => JSON.stringify({ menuName: draft.menuName, active: draft.active, items: draft.items }));
  const typeRef = useRef(null);
  useOutside(typeRef, () => setTypeOpen(false));

  const selected = findNode(draft.items, draft.selectedId);
  const flat = flatten(draft.items);
  const allIds = flat.map((n) => n.id);
  const checked = draft.checked;
  const some = checked.length > 0 && checked.length < allIds.length;
  const all = allIds.length > 0 && checked.length === allIds.length;
  const headerRef = useRef(null);
  useEffect(() => {
    if (headerRef.current) headerRef.current.indeterminate = some && !all;
  }, [some, all]);

  function setChecked(next) {
    setDraft({ ...draft, checked: next });
  }

  function toggleCheck(id) {
    const node = findNode(draft.items, id);
    const isOn = checked.includes(id);
    const next = new Set(checked);
    if (isOn) {
      [id, ...descendantsOf(node)].forEach((x) => next.delete(x));
    } else {
      next.add(id);
      ancestorsOf(draft.items, id).forEach((x) => next.add(x));
    }
    setChecked([...next]);
  }

  function toggleHeader() {
    if (all || some) setChecked([]);
    else setChecked(allIds);
  }

  function patchSelected(patch) {
    setDraft({
      ...draft,
      items: mapTree(draft.items, (n) => (n.id === draft.selectedId ? { ...n, ...patch } : n)),
    });
  }

  function addNewItem(where) {
    const next = item({ name: "New Page", linkTo: "/" });
    const sel = findNode(draft.items, draft.selectedId);
    let items = draft.items;
    if (where === "under" && sel) {
      const d = flatten(draft.items).find((n) => n.id === sel.id);
      if (d && d.depth >= 3) return;
      items = insertChild(draft.items, sel.id, next);
      const flat = flatten(items);
      let cur = flat.find((n) => n.id === sel.id);
      while (cur && cur.depth > 1 && cur.parentId) cur = flat.find((n) => n.id === cur.parentId);
      if (cur && cur.depth === 1) setTreeExpanded((prev) => ({ ...prev, [cur.id]: true }));
    } else {
      items = [...draft.items, next];
    }
    setDraft({ ...draft, items, selectedId: next.id });
    setAddMenuOpen(false);
    setFlashRowId(next.id);
    setTimeout(() => setFlashRowId((id) => (id === next.id ? null : id)), 1200);
  }

  function addNew() {
    if (selected) {
      setAddMenuOpen((open) => !open);
      setRowMenu(null);
      return;
    }
    const first = !addTipSeen();
    markAddTipSeen();
    addNewItem("top");
    if (first) {
      setToast("Added at the bottom as a top-level item");
      setTimeout(() => setToast(""), 1600);
    }
  }

  function bulk(action) {
    if (action === "clear") {
      setChecked([]);
      return;
    }
    if (action === "hide") {
      setDraft({
        ...draft,
        items: mapTree(draft.items, (n) => (checked.includes(n.id) ? { ...n, hidden: true } : n)),
        checked: [],
      });
      return;
    }
    if (action === "remove") {
      const drop = new Set(checked);
      const strip = (nodes) => nodes.filter((n) => !drop.has(n.id)).map((n) => ({ ...n, children: strip(n.children || []) }));
      const items = strip(draft.items);
      setDraft({ ...draft, items, checked: [], selectedId: items[0] ? items[0].id : null });
    }
  }

  function applyPicker(limit) {
    if (!picker || !selected) return;
    const catalog = CATALOG[picker.kind] || [];
    let pickedIds = picker.selected.slice();
    if (limit) pickedIds = pickedIds.slice(0, limit);
    const picked = [];
    walk(catalog, (n) => { if (pickedIds.includes(n.id)) picked.push(n); });
    const label = picked.map((p) => p.name).join(", ");
    function toItems(nodes, forceAll) {
      return (nodes || []).reduce((acc, n) => {
        const takeAllKids = !!picker.include[n.id];
        const children = toItems(n.children || [], takeAllKids);
        if (forceAll || pickedIds.includes(n.id) || children.length) {
          acc.push(item({
            name: n.name,
            resourceType: picker.kind,
            linkedLabel: n.name,
            linkedIds: [n.id],
            imageSource: "Collection",
            includeChildren: takeAllKids,
            children,
          }));
        }
        return acc;
      }, []);
    }
    const nested = toItems(catalog);
    function trimToLevel(nodes, nodeDepth) {
      return (nodes || []).reduce((acc, n) => {
        if (nodeDepth > 3) return acc;
        acc.push({
          ...n,
          children: nodeDepth >= 3 ? [] : trimToLevel(n.children || [], nodeDepth + 1),
        });
        return acc;
      }, []);
    }
    function collectLinkedIds(node) {
      const ids = [];
      walk([node], (n) => {
        (n.linkedIds || []).forEach((cid) => { if (!ids.includes(cid)) ids.push(cid); });
      });
      return ids;
    }
    const hit = flatten(draft.items).find((n) => n.id === selected.id);
    const forest = trimToLevel(nested, hit ? hit.depth : 1);
    const items = JSON.parse(JSON.stringify(draft.items));
    const loc = locate(items, selected.id);
    if (!loc) {
      setPicker(null);
      setAlert(null);
      return;
    }
    if (!forest.length) {
      loc.list[loc.index] = {
        ...loc.list[loc.index],
        linkedLabel: label || selected.linkedLabel,
        linkedIds: pickedIds,
        resourceType: picker.kind,
      };
    } else {
      const first = forest[0];
      const rest = forest.slice(1);
      loc.list[loc.index] = {
        ...loc.list[loc.index],
        name: first.name,
        linkedLabel: first.linkedLabel,
        linkedIds: collectLinkedIds(first),
        resourceType: picker.kind,
        imageSource: first.imageSource || "Collection",
        includeChildren: !!first.includeChildren,
        childTotal: first.childTotal,
        children: first.children || [],
      };
      if (rest.length) loc.list.splice(loc.index + 1, 0, ...rest);
    }
    setDraft({ ...draft, items, selectedId: loc.list[loc.index].id });
    setPicker(null);
    setAlert(null);
  }

  function tryApply() {
    if (!picker) return;
    const n = picker.selected.length;
    if (n > 20) setAlert({ count: n, cap: 20 });
    else if (n > 10) setAlert({ count: n, cap: 10 });
    else applyPicker();
  }

  const showHide = selected && selected.name && selected.name !== "New Page";

  function requestSave() {
    const dirty = JSON.stringify({ menuName: draft.menuName, active: draft.active, items: draft.items }) !== baseline;
    if (!draft.active) {
      onSave();
      setToast("Menu saved");
      setTimeout(() => setToast(""), 1800);
      return;
    }
    if (wasLive) {
      if (!dirty) {
        onSave();
        setToast("Menu saved");
        setTimeout(() => setToast(""), 1800);
        return;
      }
      setSaveConfirm("edit-live");
      return;
    }
    setSaveConfirm("make-live");
  }

  return (
    <Shell crumb="Create New" onCrumb={onCancel}>
      <div className="rp-editor-head">
        <h1 onClick={onCancel}>Create new Navigation</h1>
        <div style={{ width: 280 }}>
          <Field label="Menu Name" value={draft.menuName} onChange={(v) => setDraft({ ...draft, menuName: v })} />
        </div>
        <div className="flex items-center gap-2 pb-3">
          <span className="text-[14px]">{draft.active ? "Active" : "Inactive"}</span>
          <Switch on={draft.active} onToggle={() => setDraft({ ...draft, active: !draft.active })} label="Active" />
        </div>
        <div className="ml-auto flex gap-2 pb-2">
          <Btn onClick={() => setPreview(true)}><i className="mdi mdi-eye-outline text-[16px]" />Preview</Btn>
          <Btn onClick={onCancel}>Cancel</Btn>
          <Btn primary onClick={requestSave}>Save</Btn>
        </div>
      </div>

      <div className="rp-split">
        <section className="rp-tree">
          <div className="rp-tree-bar">
            <h2>Menu structure</h2>
            <div className="rp-tree-bar-actions">
              {draft.items.some((n) => (n.children || []).length) && (
                <button
                  type="button"
                  className="rp-expand"
                  onClick={() => {
                    const nodes = draft.items.filter((n) => (n.children || []).length);
                    const allOpen = nodes.every((n) => treeExpanded[n.id] !== false);
                    const next = {};
                    nodes.forEach((n) => { next[n.id] = !allOpen; });
                    setTreeExpanded(next);
                  }}
                >
                  {draft.items.filter((n) => (n.children || []).length).every((n) => treeExpanded[n.id] !== false) ? "Collapse all" : "Expand all"}
                </button>
              )}
              <div className="rp-add-wrap" ref={addRef}>
                <Btn primary onClick={addNew}>Add new</Btn>
                {addMenuOpen && selected && (
                  <div className="rp-menu rp-add-menu" role="menu">
                    <button
                      type="button"
                      role="menuitem"
                      className="preferred"
                      disabled={flatten(draft.items).find((n) => n.id === selected.id)?.depth >= 3}
                      title={flatten(draft.items).find((n) => n.id === selected.id)?.depth >= 3 ? "Max nesting is L3" : undefined}
                      onClick={() => addNewItem("under")}
                    >
                      <i className="mdi mdi-subdirectory-arrow-right" aria-hidden="true" />Add under {selected.name}
                    </button>
                    <button type="button" role="menuitem" onClick={() => addNewItem("top")}>
                      <i className="mdi mdi-format-list-bulleted" aria-hidden="true" />Add to top level
                    </button>
                  </div>
                )}
                {!selected && draft.items.length === 0 && !addTipSeen() && (
                  <div className="rp-add-tip">Adds a top-level item at the bottom of the menu.</div>
                )}
              </div>
            </div>
          </div>

          {checked.length > 0 && (
            <div className="rp-bulk">
              <span className="text-[14px] font-medium">{checked.length} selected</span>
              <div className="ml-auto flex gap-2">
                {["Hide", "Remove", "Clear"].map((a) => (
                  <Btn key={a} ghost className="ghost" onClick={() => bulk(a.toLowerCase())}>{a}</Btn>
                ))}
              </div>
            </div>
          )}

          {draft.items.length === 0 ? (
            <div className="rp-empty">
              <h3>Build your storefront menu</h3>
              <p>Add collections in bulk, or add a single item. Nested children can be pulled from your catalog.</p>
              <p>New items are added at the bottom as top-level items. Select a row, then Add new, to choose Add under instead.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <div className="rp-cols">
                <input ref={headerRef} type="checkbox" checked={all} className="indeterminate" onChange={toggleHeader} />
                <span />
                <span />
                <span>Item</span>
                <span>{flatten(draft.items).some((n) => (n.children || []).length) ? "Included" : "Include children"}</span>
                <span>Level</span>
                <span />
              </div>
              <TreeRows
                nodes={draft.items}
                depth={1}
                selectedId={draft.selectedId}
                checked={checked}
                treeExpanded={treeExpanded}
                setTreeExpanded={setTreeExpanded}
                rowMenu={rowMenu}
                setRowMenu={setRowMenu}
                flashRowId={flashRowId}
                onSelect={(id) => { setAddMenuOpen(false); setDraft({ ...draft, selectedId: id }); }}
                onCheck={toggleCheck}
                onIndent={(id) => {
                  const items = JSON.parse(JSON.stringify(draft.items));
                  const loc = locate(items, id);
                  if (!loc || loc.index === 0) return;
                  const node = loc.list.splice(loc.index, 1)[0];
                  const prev = loc.list[loc.index - 1];
                  prev.children = prev.children || [];
                  prev.children.push(node);
                  setDraft({ ...draft, items, selectedId: id });
                  setRowMenu(null);
                }}
                onOutdent={(id) => {
                  const items = JSON.parse(JSON.stringify(draft.items));
                  const loc = locate(items, id);
                  if (!loc || !loc.parent) return;
                  const parentLoc = locate(items, loc.parent.id);
                  const node = loc.list.splice(loc.index, 1)[0];
                  parentLoc.list.splice(parentLoc.index + 1, 0, node);
                  setDraft({ ...draft, items, selectedId: id });
                  setRowMenu(null);
                }}
                onHide={(id) =>
                  setDraft({
                    ...draft,
                    items: mapTree(draft.items, (n) => (n.id === id ? { ...n, hidden: !n.hidden } : n)),
                    selectedId: id,
                  })
                }
                onRemove={(id) => {
                  const strip = (nodes) => nodes.filter((n) => n.id !== id).map((n) => ({ ...n, children: strip(n.children || []) }));
                  const items = strip(draft.items);
                  setDraft({ ...draft, items, selectedId: items[0] ? items[0].id : null, checked: draft.checked.filter((x) => x !== id) });
                }}
              />
            </div>
          )}
        </section>

        <aside className="rp-details">
          <h3>Item Details</h3>
          <p className="hint">
            {selected ? "Feeds storefront mega menu configuration" : "Select a menu item to edit label, link, and image."}
          </p>
          {!selected ? (
            <div className="rp-details-empty">
              <i className="mdi mdi-playlist-remove" />
              <b>Nothing selected yet</b>
              <p>Select a menu item to edit label, link, and image.</p>
            </div>
          ) : (
            <div className="rp-fields">
              <Field label="Menu page name" value={selected.name} onChange={(v) => patchSelected({ name: v })} />
              <div className="rp-field" ref={typeRef}>
                <span>Resource type</span>
                <button type="button" className="rp-select-btn" onClick={() => setTypeOpen((v) => !v)}>
                  {selected.resourceType}
                  <i className="mdi mdi-chevron-down" />
                </button>
                {typeOpen && (
                  <div className="rp-menu" style={{ width: "100%", top: 62, zIndex: 50 }}>
                    {RESOURCE_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={t === selected.resourceType ? "is-active" : ""}
                        onClick={() => {
                          patchSelected({ resourceType: t, linkedLabel: "", linkedIds: [], linkTo: t === "Custom URL" ? selected.linkTo || "/" : "" });
                          setTypeOpen(false);
                          if (PICKER_TYPES.includes(t)) setPicker({ kind: t, selected: [], include: {}, expanded: {}, query: "" });
                          else setPicker(null);
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selected.resourceType === "Custom URL" && (
                <Field label="Link to" value={selected.linkTo} onChange={(v) => patchSelected({ linkTo: v })} />
              )}

              {PICKER_TYPES.includes(selected.resourceType) && (
                <>
                  <Field
                    label="Linked Resources"
                    value={selected.linkedLabel ? `${selected.resourceType === "Pages" || selected.resourceType === "Blogs" ? selected.resourceType : "Collection"} - ${selected.linkedLabel}` : ""}
                    readOnly
                  />
                  <Btn className="w-full" onClick={() => setPicker({ kind: selected.resourceType, selected: selected.linkedIds || [], include: {}, expanded: {}, query: "" })}>
                    Change selection
                  </Btn>
                </>
              )}

              {picker && PICKER_TYPES.includes(selected.resourceType) && (
                <Picker kind={picker.kind} state={picker} setState={setPicker} onApply={tryApply} />
              )}

              {alert && (
                <div className="rp-alert">
                  <p><b>{alert.count}</b> selected (with children). Storefront max recommended is <b>{alert.cap}</b>.</p>
                  <div className="flex gap-2">
                    <Btn primary onClick={() => applyPicker(alert.cap)}>Add first {alert.cap}</Btn>
                    <Btn onClick={() => setAlert(null)}>Cancel</Btn>
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 text-[12px] text-[rgba(0,0,0,0.6)]">Image source</p>
                <div className="rp-seg">
                  {IMG_SRC_TABS.map((opt) => (
                    <button key={opt.value} type="button" className={selected.imageSource === opt.value ? "on" : ""} onClick={() => patchSelected({ imageSource: opt.value })}>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="rp-note">
                  <i className={`mdi ${selected.imageSource === "None" ? "mdi-image-off-outline" : selected.imageSource === "Custom" ? "mdi-image-plus-outline" : "mdi-image-outline"} text-[18px]`} />
                  <span>
                    {IMAGE_NOTES[selected.imageSource]}
                    {selected.imageSource === "Custom" && (
                      <label className="rp-file">
                        <input type="file" accept="image/*" onChange={(e) => {
                          const f = e.target.files && e.target.files[0];
                          if (f) patchSelected({ customImage: URL.createObjectURL(f) });
                        }} />
                        Choose file
                      </label>
                    )}
                    {selected.imageSource === "Custom" && selected.customImage && (
                      <img className="rp-thumb mt-2" src={selected.customImage} alt="" />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {showHide && (
                  <Btn className="flex-1" onClick={() => patchSelected({ hidden: !selected.hidden })}>
                    {selected.hidden ? "Unhide on storefront" : "Hide on storefront"}
                  </Btn>
                )}
                <Btn className="flex-1" onClick={() => {
                  const strip = (nodes) => nodes.filter((n) => n.id !== selected.id).map((n) => ({ ...n, children: strip(n.children || []) }));
                  const items = strip(draft.items);
                  setDraft({ ...draft, items, selectedId: items[0] ? items[0].id : null, checked: draft.checked.filter((id) => id !== selected.id) });
                }}>
                  Remove from menu
                </Btn>
              </div>
            </div>
          )}
        </aside>
      </div>

      {saveConfirm && (
        <div className="rp-modal save-alert" onClick={() => setSaveConfirm(false)}>
          <div className="rp-modal-card rp-save-confirm" onClick={(e) => e.stopPropagation()}>
            <h2 id="save-alert-title">{saveConfirm === "edit-live" ? "This menu is live" : "This will make the menu live"}</h2>
            <p>
              {saveConfirm === "edit-live"
                ? "This menu is live on your storefront - shoppers will see updated menu immediately."
                : "Once you save, this menu becomes visible to shoppers on your storefront."}
            </p>
            <div className="rp-save-confirm-acts">
              <Btn className="text" onClick={() => setSaveConfirm(false)}>Cancel</Btn>
              <Btn primary onClick={() => { setSaveConfirm(false); onSave(); setToast("Menu saved"); setTimeout(() => setToast(""), 1800); }}>Save</Btn>
            </div>
          </div>
        </div>
      )}
      {preview && (
        <div className="rp-modal" onClick={() => setPreview(false)}>
          <div className="rp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[16px] font-medium">Theme preview</h3>
              <button type="button" onClick={() => setPreview(false)} aria-label="Close"><i className="mdi mdi-close" /></button>
            </div>
            <ul className="space-y-1 text-[14px]">
              {flatten(draft.items).filter((n) => !n.hidden).map((n) => (
                <li key={n.id} style={{ paddingLeft: (n.depth - 1) * 16 }}>{n.name}</li>
              ))}
              {flatten(draft.items).filter((n) => !n.hidden).length === 0 && <li className="text-[rgba(0,0,0,0.6)]">No visible items</li>}
            </ul>
          </div>
        </div>
      )}
      {toast && <div className="rp-toast">{toast}</div>}
    </Shell>
  );
}

function TreeRows({ nodes, depth, selectedId, checked, onSelect, onCheck, onHide, onRemove, onIndent, onOutdent, rowMenu, setRowMenu, treeExpanded, setTreeExpanded, flashRowId }) {
  return nodes.map((n) => {
    const loc = locate(nodes, n.id);
    const canIndent = loc && loc.index > 0 && depth < 3;
    const canOutdent = depth > 1;
    const kids = (n.children || []).length;
    const expanded = treeExpanded[n.id] !== false;
    const showKids = kids && (depth !== 1 || expanded);
    return (
    <React.Fragment key={n.id}>
      <div
        onClick={() => onSelect(n.id)}
        className={`rp-row ${n.id === selectedId ? "selected" : ""} ${n.hidden ? "hidden-item" : ""} ${n.id === flashRowId ? "flash" : ""}`}
        style={{ paddingLeft: 20 + (depth - 1) * 20 }}
      >
        <input type="checkbox" checked={checked.includes(n.id)} onClick={(e) => e.stopPropagation()} onChange={() => onCheck(n.id)} />
        <span className="rp-drag" title="Drag to reorder" aria-label="Drag">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M9 8C10.1 8 11 7.1 11 6C11 4.9 10.1 4 9 4C7.9 4 7 4.9 7 6C7 7.1 7.9 8 9 8ZM9 10C7.9 10 7 10.9 7 12C7 13.1 7.9 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10ZM9 16C7.9 16 7 16.9 7 18C7 19.1 7.9 20 9 20C10.1 20 11 19.1 11 18C11 16.9 10.1 16 9 16Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16 8C17.1 8 18 7.1 18 6C18 4.9 17.1 4 16 4C14.9 4 14 4.9 14 6C14 7.1 14.9 8 16 8ZM16 10C14.9 10 14 10.9 14 12C14 13.1 14.9 14 16 14C17.1 14 18 13.1 18 12C18 10.9 17.1 10 16 10ZM16 16C14.9 16 14 16.9 14 18C14 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z" fill="currentColor"/>
          </svg>
        </span>
        {depth === 1 && kids ? (
          <button
            type="button"
            className="rp-chev"
            aria-label={`${expanded ? "Collapse" : "Expand"} ${n.name}`}
            aria-expanded={expanded}
            onClick={(e) => { e.stopPropagation(); setTreeExpanded({ ...treeExpanded, [n.id]: !expanded }); }}
          >
            <i className={`mdi ${expanded ? "mdi-chevron-down" : "mdi-chevron-right"}`} />
          </button>
        ) : <span className="rp-chev-slot" />}
        <div>
          <div className="nm">
            {n.name}
            {n.hidden && <span className="rp-hidden-tag">Hidden</span>}
          </div>
          <div className="sub">{subtitle(n)}</div>
        </div>
        <div className="rp-included">{includedLabel(n)}</div>
        <LevelPill depth={depth} />
        <div className="rp-row-act" onClick={(e) => e.stopPropagation()}>
          <button type="button" className={`rp-kebab ${rowMenu === n.id ? "on" : ""}`} aria-label="Item actions" onClick={() => setRowMenu(rowMenu === n.id ? null : n.id)}>
            <i className="mdi mdi-dots-vertical" />
          </button>
          {rowMenu === n.id && (
            <div className="rp-menu rp-action-menu" style={{ right: 0, top: 36 }}>
              <button type="button" disabled={!canIndent} onClick={() => onIndent(n.id)}>Indent</button>
              <button type="button" disabled={!canOutdent} onClick={() => onOutdent(n.id)}>Outdent</button>
              <button type="button" onClick={() => { onHide(n.id); setRowMenu(null); }}>{n.hidden ? "Unhide" : "Hide"}</button>
              <button type="button" className="danger" onClick={() => { onRemove(n.id); setRowMenu(null); }}>Remove from menu</button>
            </div>
          )}
        </div>
      </div>
      {showKids && (
        <TreeRows
          nodes={n.children}
          depth={depth + 1}
          selectedId={selectedId}
          checked={checked}
          onSelect={onSelect}
          onCheck={onCheck}
          onHide={onHide}
          onRemove={onRemove}
          onIndent={onIndent}
          onOutdent={onOutdent}
          rowMenu={rowMenu}
          setRowMenu={setRowMenu}
          treeExpanded={treeExpanded}
          setTreeExpanded={setTreeExpanded}
          flashRowId={flashRowId}
        />
      )}
    </React.Fragment>
    );
  });
}

function Picker({ kind, state, setState, onApply }) {
  const catalog = CATALOG[kind] || [];
  const q = (state.query || "").toLowerCase();

  function vis(nodes, depth = 1) {
    return nodes
      .filter((n) => !q || n.name.toLowerCase().includes(q) || (n.children || []).some((c) => c.name.toLowerCase().includes(q)))
      .map((n) => ({ ...n, depth, kids: vis(n.children || [], depth + 1), kidsCount: n.kids || (n.children || []).length }));
  }
  const rows = vis(catalog);

  function render(list) {
    return list.map((n) => {
      const open = state.expanded[n.id] !== false;
      const hasKids = n.kids.length > 0 || n.kidsCount > 0;
      return (
        <div key={n.id}>
          <div className="rp-pick-row" style={{ paddingLeft: (n.depth - 1) * 16 }}>
            <input
              type="checkbox"
              checked={state.selected.includes(n.id)}
              onChange={() => {
                const on = state.selected.includes(n.id);
                const next = new Set(state.selected);
                if (on) {
                  next.delete(n.id);
                  const drop = (nodes) => (nodes || []).forEach((x) => { next.delete(x.id); drop(x.kids || x.children || []); });
                  drop(n.kids || n.children || []);
                } else {
                  next.add(n.id);
                  const parents = catalogAncestors(kind, n.id);
                  parents.forEach((x) => next.add(x));
                  const expanded = { ...state.expanded };
                  parents.forEach((x) => { expanded[x] = true; });
                  setState({ ...state, selected: [...next], expanded });
                  return;
                }
                setState({ ...state, selected: [...next] });
              }}
            />
            <button type="button" className="grid place-items-center" onClick={() => setState({ ...state, expanded: { ...state.expanded, [n.id]: !open } })}>
              {hasKids ? <i className={`mdi ${open ? "mdi-chevron-down" : "mdi-chevron-right"}`} /> : <span className="w-4" />}
            </button>
            <span className="text-[14px]">{n.name}</span>
            {hasKids && !state.selected.includes(n.id) ? (
              <span className="rp-inc-count">{n.kidsCount || n.kids.length || ""}</span>
            ) : hasKids && state.selected.includes(n.id) ? (
              <button
                type="button"
                className="rp-inc-link"
                onClick={() => {
                  const kidIds = [];
                  const collect = (nodes) => (nodes || []).forEach((x) => { kidIds.push(x.id); collect(x.kids || x.children || []); });
                  collect(n.kids || n.children || []);
                  const next = new Set(state.selected);
                  next.add(n.id);
                  const allOn = kidIds.length > 0 && kidIds.every((k) => next.has(k));
                  if (allOn) kidIds.forEach((k) => next.delete(k));
                  else kidIds.forEach((k) => next.add(k));
                  setState({
                    ...state,
                    selected: [...next],
                    include: { ...state.include, [n.id]: !allOn },
                    expanded: { ...state.expanded, [n.id]: true },
                  });
                }}
              >
                {(() => {
                  const kidIds = [];
                  const collect = (nodes) => (nodes || []).forEach((x) => { kidIds.push(x.id); collect(x.kids || x.children || []); });
                  collect(n.kids || n.children || []);
                  const allOn = kidIds.length > 0 && kidIds.every((k) => state.selected.includes(k));
                  return allOn ? "Remove children" : "Include Children";
                })()}
              </button>
            ) : (
              <span className="rp-inc-empty">—</span>
            )}
            <LevelPill depth={n.depth} />
          </div>
          {hasKids && open && render(n.kids)}
        </div>
      );
    });
  }

  return (
    <div className="rp-picker">
      <div className="mb-2 flex items-center gap-2">
        <div className="rp-search-mini">
          <i className="mdi mdi-magnify text-[rgba(0,0,0,0.38)]" />
          <input placeholder="Search" value={state.query} onChange={(e) => setState({ ...state, query: e.target.value })} />
        </div>
        <button type="button" className="text-[12px] text-[#03b6fc]" onClick={() => {
          const exp = {};
          walk(catalog, (n) => { exp[n.id] = true; });
          setState({ ...state, expanded: exp });
        }}>Expand all</button>
      </div>
      <div className="mb-2 grid grid-cols-[28px_22px_1fr_132px_40px] text-[11px] text-[rgba(0,0,0,0.6)]">
        <span /><span />
        <span>Item</span>
        <span>Include Children</span>
        <span>Level</span>
      </div>
      <div className="max-h-[280px] overflow-auto">{render(rows)}</div>
      <Btn primary className="mt-3 w-full" onClick={onApply}>Apply to menu</Btn>
    </div>
  );
}

function emptyDraft() {
  nid = 1;
  return {
    menuName: "Main Menu",
    active: true,
    items: [],
    selectedId: null,
    checked: [],
  };
}

function App() {
  const [view, setView] = useState("list");
  const [menus, setMenus] = useState(() => {
    const furniture = sampleFurniture();
    return [
      { id: "m1", name: "Test", status: "Active", preview: ["Home", "About Us"], items: [
        item({ name: "Home", resourceType: "Home page", imageSource: "None" }),
        item({ name: "About Us", resourceType: "Custom URL", linkTo: "/about", imageSource: "None" }),
      ]},
      { id: "m2", name: "Draft", status: "Active", preview: ["Tools", "Automotive", "Trw Parts & Service", "Home", "Shop", "Sale", "Blog", "About"], items: furniture },
      { id: "m3", name: "Mega Menu", status: "Inactive", preview: ["Shop", "Brands", "Stockists", "Blog", "Contact"], items: [] },
      { id: "m4", name: "Test Menu", status: "Inactive", preview: ["Shop", "Brands", "Stockists", "Blog", "FAQs", "About", "Help"], items: [] },
    ];
  });
  const [draft, setDraft] = useState(emptyDraft());
  const [editingId, setEditingId] = useState(null);

  function create() {
    setEditingId(null);
    setDraft(emptyDraft());
    setView("editor");
  }

  function open(id) {
    const m = menus.find((x) => x.id === id);
    setEditingId(id);
    setDraft({
      menuName: m.name,
      active: m.status === "Active",
      items: m.items ? JSON.parse(JSON.stringify(m.items)) : [],
      selectedId: m.items && m.items[0] ? m.items[0].id : null,
      checked: [],
    });
    setView("editor");
  }

  function save() {
    const preview = flatten(draft.items).filter((n) => n.depth === 1).map((n) => n.name).slice(0, 8);
    const rec = {
      id: editingId || uid(),
      name: draft.menuName,
      status: draft.active ? "Active" : "Inactive",
      preview: preview.length ? preview : ["—"],
      items: draft.items,
    };
    if (editingId) setMenus(menus.map((m) => (m.id === editingId ? rec : m)));
    else setMenus([rec, ...menus]);
    setView("list");
  }

  function onDelete(id) {
    setMenus(menus.filter((m) => m.id !== id));
  }

  if (view === "list") return <ListingPage menus={menus} onCreate={create} onOpen={open} onDelete={onDelete} />;
  return <EditorPage draft={draft} setDraft={setDraft} onCancel={() => setView("list")} onSave={save} wasLive={!!(editingId && menus.find((m) => m.id === editingId && m.status === "Active"))} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
