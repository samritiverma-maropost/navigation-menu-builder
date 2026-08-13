/* Design Ready clickable prototype — frames from Figma 11100:44617 */
(function () {
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
  const SORTS = ["Synced", "A → Z", "Z → A", "New → Old", "Old → New", "Manual"];
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
    Category: [
      {
        id: "k-furn", name: "Furniture",
        children: [
          {
            id: "k-sofas", name: "Sofas",
            children: [
              { id: "k-seats", name: "Seats", children: [] },
              { id: "k-3s", name: "3 Seater", children: [] },
              { id: "k-2s", name: "2 Seater", children: [] },
              { id: "k-corner", name: "Corner Sofa", children: [] },
            ],
          },
          {
            id: "k-tables", name: "Tables",
            children: [
              { id: "k-coffee", name: "Coffee Table", children: [] },
              { id: "k-dine", name: "Dinning Table", children: [] },
              { id: "k-side", name: "Side Table", children: [] },
              { id: "k-console", name: "Console Table", children: [] },
            ],
          },
          {
            id: "k-beds", name: "Beds",
            children: [
              { id: "k-king", name: "King Bed", children: [] },
              { id: "k-queen", name: "Queen Bed", children: [] },
              { id: "k-bedside", name: "Bedside", children: [] },
            ],
          },
          {
            id: "k-storage", name: "Storage",
            children: [
              { id: "k-book", name: "Bookcases", children: [] },
              { id: "k-sideboard", name: "Sideboards", children: [] },
              { id: "k-ward", name: "Wardrobes", children: [] },
            ],
          },
        ],
      },
      {
        id: "k-out", name: "Outdoor",
        children: [
          {
            id: "k-out-sofa", name: "Outdoor Sofa",
            children: [
              { id: "k-lounge", name: "Lounge Setting", children: [] },
              { id: "k-out-chair", name: "Outdoor Armchair", children: [] },
            ],
          },
          {
            id: "k-out-table", name: "Outdoor Table",
            children: [
              { id: "k-out-dine", name: "Dining Setting", children: [] },
              { id: "k-bar", name: "Bar Table", children: [] },
            ],
          },
          {
            id: "k-umb", name: "Umbrellas",
            children: [
              { id: "k-cant", name: "Cantilever", children: [] },
              { id: "k-market", name: "Market Umbrella", children: [] },
              { id: "k-patio", name: "Patio", children: [] },
            ],
          },
        ],
      },
      {
        id: "k-light", name: "Lighting",
        children: [
          {
            id: "k-ceil", name: "Ceiling",
            children: [
              { id: "k-pend", name: "Pendants", children: [] },
              { id: "k-chand", name: "Chandeliers", children: [] },
            ],
          },
          {
            id: "k-floor", name: "Floor Lamps",
            children: [
              { id: "k-arc", name: "Arc Lamp", children: [] },
              { id: "k-tripod", name: "Tripod Lamp", children: [] },
            ],
          },
          {
            id: "k-tlamp", name: "Table Lamps",
            children: [
              { id: "k-ceramic", name: "Ceramic Base", children: [] },
              { id: "k-desk", name: "Desk Lamp", children: [] },
            ],
          },
        ],
      },
      {
        id: "k-bedrm", name: "Bedroom",
        children: [
          {
            id: "k-matt", name: "Mattresses",
            children: [
              { id: "k-pocket", name: "Pocket Spring", children: [] },
              { id: "k-foam", name: "Foam", children: [] },
            ],
          },
          {
            id: "k-bedding", name: "Bedding",
            children: [
              { id: "k-duvet", name: "Duvet Covers", children: [] },
              { id: "k-sheets", name: "Sheet Sets", children: [] },
            ],
          },
        ],
      },
      {
        id: "k-decor", name: "Decor",
        children: [
          {
            id: "k-rugs", name: "Rugs",
            children: [
              { id: "k-runner", name: "Runner", children: [] },
              { id: "k-area", name: "Area Rug", children: [] },
            ],
          },
          {
            id: "k-cush", name: "Cushions",
            children: [
              { id: "k-scatter", name: "Scatter", children: [] },
              { id: "k-out-cush", name: "Outdoor Cushion", children: [] },
            ],
          },
        ],
      },
      {
        id: "k-sale", name: "Sale",
        children: [
          {
            id: "k-clr-sofa", name: "Clearance Sofas",
            children: [
              { id: "k-floor-3s", name: "Floor Stock 3 Seater", children: [] },
            ],
          },
          {
            id: "k-weekend", name: "Weekend Deals",
            children: [
              { id: "k-md-table", name: "Marked Down Tables", children: [] },
              { id: "k-light-sale", name: "Lighting Sale", children: [] },
            ],
          },
        ],
      },
    ],
    Collection: [
      {
        id: "c-furn", name: "Furniture",
        children: [
          {
            id: "c-sofas", name: "Sofas",
            children: [
              { id: "c-seats", name: "Seats", children: [] },
              { id: "c-3s", name: "3 Seater", children: [] },
              { id: "c-2s", name: "2 Seater", children: [] },
              { id: "c-sect", name: "Sectional", children: [] },
            ],
          },
          {
            id: "c-tables", name: "Tables",
            children: [
              { id: "c-coffee", name: "Coffee tables", children: [] },
              { id: "c-dine", name: "Dining tables", children: [] },
              { id: "c-side", name: "Side tables", children: [] },
            ],
          },
          {
            id: "c-beds", name: "Beds",
            children: [
              { id: "c-plat", name: "Platform beds", children: [] },
              { id: "c-uph", name: "Upholstered beds", children: [] },
            ],
          },
          {
            id: "c-storage", name: "Storage",
            children: [
              { id: "c-book", name: "Bookcases", children: [] },
              { id: "c-sideb", name: "Sideboards", children: [] },
            ],
          },
        ],
      },
      {
        id: "c-out", name: "Outdoor",
        children: [
          {
            id: "c-patio", name: "Patio",
            children: [
              { id: "c-lounge-set", name: "Lounge sets", children: [] },
              { id: "c-out-dining", name: "Outdoor dining", children: [] },
            ],
          },
          {
            id: "c-garden", name: "Garden",
            children: [
              { id: "c-umb", name: "Umbrellas", children: [] },
              { id: "c-planters", name: "Planters", children: [] },
            ],
          },
        ],
      },
      {
        id: "c-new", name: "New arrivals",
        children: [
          {
            id: "c-spring", name: "Spring edit",
            children: [
              { id: "c-feat-sofa", name: "Featured sofas", children: [] },
              { id: "c-feat-light", name: "Featured lighting", children: [] },
            ],
          },
          {
            id: "c-landed", name: "Just landed",
            children: [
              { id: "c-new-out", name: "New outdoor", children: [] },
            ],
          },
        ],
      },
      {
        id: "c-best", name: "Best sellers",
        children: [
          {
            id: "c-top-sofas", name: "Top sofas",
            children: [
              { id: "c-best-3s", name: "3 Seater bestsellers", children: [] },
            ],
          },
          {
            id: "c-top-tables", name: "Top tables",
            children: [
              { id: "c-best-dine", name: "Dining bestsellers", children: [] },
            ],
          },
        ],
      },
      {
        id: "c-living", name: "Living room",
        children: [
          {
            id: "c-packages", name: "Lounge packages",
            children: [
              { id: "c-sofa-coffee", name: "Sofa + coffee table", children: [] },
            ],
          },
          {
            id: "c-accent", name: "Accent",
            children: [
              { id: "c-accent-side", name: "Side tables", children: [] },
              { id: "c-accent-lamp", name: "Lamps", children: [] },
            ],
          },
        ],
      },
    ],
    Pages: [
      { id: "p-about", name: "About us", children: [] },
      { id: "p-contact", name: "Contact", children: [] },
      { id: "p-indoor", name: "Indoor", children: [] },
      { id: "p-out", name: "Outdoor", children: [] },
      { id: "p-furn", name: "Furniture", children: [] },
      { id: "p-faq", name: "FAQs", children: [] },
    ],
    Blogs: [
      {
        id: "b-indoor", name: "Style Your Indoor", kids: 2,
        children: [
          { id: "b-patio", name: "Patio to Pantry", children: [] },
          { id: "b-canvas", name: "The Living Canvas", children: [] },
        ],
      },
      { id: "b-trend", name: "Latest Trend", children: [] },
      { id: "b-style", name: "Design Style", children: [] },
      { id: "b-scribble", name: "The Daily Scribble", children: [] },
      { id: "b-espresso", name: "Midnight Espresso", children: [] },
    ],
  };

  const TYPE_NOTES = {
    "Home page": { title: "Home page", body: "Links to the storefront home. No collection picker for this type." },
    Search: { title: "Search", body: "Links to storefront search results." },
    Products: { title: "Products", body: "This item links to a product. Menu nesting still follows L1 → L2 → L3." },
  };

  const IMAGE_NOTES = {
    Collection: {
      title: "Using collection image",
      body: "Pulled from the linked resource. Shown in the mega menu feature tile.",
      icon: "mdi-image-outline",
    },
    Custom: {
      title: "Upload image",
      body: "PNG or JPG · recommended 800×600 for mega menu",
      icon: "mdi-image-plus-outline",
    },
    None: {
      title: "No image on this item",
      body: "Mega menu shows text only for this link (no feature tile image).",
      icon: "mdi-image-off-outline",
    },
  };

  let nid = 1;
  const uid = () => "n" + nid++;
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function walk(nodes, fn, parent, depth) {
    depth = depth || 1;
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
    walk(nodes, (n, parent, depth) => out.push({ n, parent, depth }));
    return out;
  }
  function findNode(nodes, id) {
    let found = null;
    walk(nodes, (n) => { if (n.id === id) found = n; });
    return found;
  }
  function mapTree(nodes, fn) {
    return (nodes || []).map((n) => fn({ ...n, children: n.children ? mapTree(n.children, fn) : [] }));
  }
  function ancestorsOf(nodes, id) {
    const flat = flatten(nodes);
    const byId = {};
    flat.forEach(({ n, parent }) => { byId[n.id] = parent; });
    const chain = [];
    let p = byId[id];
    while (p) { chain.push(p.id); p = byId[p.id]; }
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
  function catalogFind(kind, id) {
    let found = null;
    walk(CATALOG[kind] || [], (n) => { if (n.id === id) found = n; });
    return found;
  }

  function catalogAncestors(kind, id) {
    const chain = [];
    function search(nodes, parents) {
      for (let i = 0; i < (nodes || []).length; i++) {
        const n = nodes[i];
        if (n.id === id) {
          chain.push.apply(chain, parents);
          return true;
        }
        if (search(n.children, parents.concat(n.id))) return true;
      }
      return false;
    }
    search(CATALOG[kind] || [], []);
    return chain;
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
      savedTypes: {},
      ...partial,
    };
  }

  function contactItem(extra) {
    return item({
      name: "Contact",
      resourceType: "Custom URL",
      linkTo: "/Contact us",
      imageSource: "None",
      ...extra,
    });
  }

  function furnitureTree() {
    const seats = item({ name: "Seats", resourceType: "Category", linkedLabel: "Seats", linkedIds: ["k-seats"], imageSource: "Collection" });
    const seater = item({ name: "3 Seater", resourceType: "Category", linkedLabel: "3 Seater", linkedIds: ["k-3s"], imageSource: "Collection" });
    const coffee = item({ name: "Coffee Table", resourceType: "Category", linkedLabel: "Coffee tables", linkedIds: ["k-coffee"], imageSource: "Collection" });
    const sofas = item({
      name: "Sofas", resourceType: "Category", linkedLabel: "Sofas", linkedIds: ["k-sofas"],
      imageSource: "Collection", includeChildren: true, childTotal: 4, children: [seats, seater],
    });
    const tables = item({
      name: "Tables", resourceType: "Category", linkedLabel: "Tables", linkedIds: ["k-tables"],
      imageSource: "Collection", includeChildren: false, childTotal: 4, children: [coffee],
    });
    const furniture = item({
      name: "Furniture", resourceType: "Category", linkedLabel: "Furniture", linkedIds: ["k-furn"],
      imageSource: "None", includeChildren: true, childTotal: 18, children: [sofas, tables],
    });
    return [contactItem(), furniture];
  }

  const LISTING = [
    { id: "m1", name: "Test", status: "Active", chips: ["Home", "About Us"] },
    { id: "m2", name: "Draft", status: "Active", chips: ["Tools", "Automotive", "Trw Parts & Service"], more: 5 },
    { id: "m3", name: "Mega Menu", status: "Inactive", chips: ["Shop", "Brands", "Stockists", "Blog", "Contact"] },
    { id: "m4", name: "Test Menu", status: "Inactive", chips: ["Shop", "Brands", "Stockists", "Blog", "FAQs"], more: 2 },
  ];

  function emptyDraft() {
    nid = 1;
    return {
      menuName: "Main Menu",
      active: true,
      sort: "New → Old",
      items: [],
      selectedId: null,
      checked: [],
      nameError: false,
    };
  }

  const params = new URLSearchParams(location.search);
  const hash = (location.hash || "").replace(/^#/, "");
  const startFlow = (params.get("flow") || (hash.indexOf("flow=") === 0 ? hash.slice(5) : hash) || "a").toLowerCase();

  const state = {
    view: "listing",
    flow: startFlow,
    screen: "Listing page",
    menus: LISTING.map((m) => ({ ...m })),
    hoverId: "m2",
    listKebab: null,
    rowsPerPage: 10,
    rowsOpen: false,
    headerOpen: null,
    draft: emptyDraft(),
    editingId: null,
    sortOpen: false,
    typeOpen: false,
    rowMenu: null,
    picker: null,
    pickerByType: {},
    preview: false,
    toast: "",
    alert: null,
    bulkMode: 1,
    loading: false,
    savedToast: false,
  };

  function seedFlow(flow) {
    state.flow = flow;
    state.sortOpen = false;
    state.typeOpen = false;
    state.rowMenu = null;
    state.picker = null;
    state.pickerByType = {};
    state.alert = null;
    state.preview = false;
    state.listKebab = null;
    state.headerOpen = null;
    nid = 40;

    if (flow === "a") {
      state.view = "listing";
      state.screen = "Listing page";
      state.draft = emptyDraft();
      return;
    }
    if (flow === "b") {
      const c = contactItem({ name: "Contact Us", linkTo: "/contact", imageSource: "None" });
      state.view = "editor";
      state.screen = "Image Source: None";
      state.draft = { ...emptyDraft(), items: [c], selectedId: c.id };
      return;
    }
    if (flow === "c") {
      const page = item({ name: "New Page", resourceType: "Custom URL", linkTo: "/" });
      const c = contactItem();
      state.view = "editor";
      state.screen = "Add new menu 2";
      state.draft = { ...emptyDraft(), items: [c, page], selectedId: page.id };
      return;
    }
    if (flow === "d") {
      const c = contactItem({ name: "Contact Us", linkTo: "/Contact", imageSource: "Collection", resourceType: "Pages" });
      state.view = "editor";
      state.screen = "Resource type page";
      state.draft = { ...emptyDraft(), items: [c], selectedId: c.id };
      return;
    }
    if (flow === "e") {
      const c = contactItem({ name: "Contact Us", linkTo: "/Contact", imageSource: "Collection", resourceType: "Blogs" });
      state.view = "editor";
      state.screen = "Resource type blogs";
      state.draft = { ...emptyDraft(), items: [c], selectedId: c.id };
      return;
    }
    if (flow === "bulk1" || flow === "bulk2") {
      const items = furnitureTree();
      const ids = [];
      walk(items, (n) => { if (["Contact", "Furniture", "Sofas", "Seats"].includes(n.name)) ids.push(n.id); });
      const furn = findNode(items, items[1].id);
      state.view = "editor";
      state.screen = flow === "bulk2" ? "Bulk action idea 2" : "Bulk action idea 1";
      state.bulkMode = flow === "bulk2" ? 2 : 1;
      state.draft = { ...emptyDraft(), items, selectedId: furn.id, checked: ids.slice(0, 3) };
      return;
    }
    if (flow === "alert1") {
      const page = item({ name: "New Page", resourceType: "Category" });
      const items = [contactItem(), page];
      const selected = [];
      walk(CATALOG.Category, (n) => selected.push(n.id));
      state.view = "editor";
      state.screen = "Alert msg 1";
      state.draft = { ...emptyDraft(), items, selectedId: page.id };
      state.picker = { kind: "Category", selected, include: {}, expanded: { "k-furn": true, "k-sofas": true, "k-tables": true }, query: "" };
      state.alert = { type: "overcap", count: 20, cap: 10 };
      return;
    }
    if (flow === "alert2") {
      const page = item({ name: "New Page", resourceType: "Category" });
      const items = [contactItem(), page];
      const selected = [];
      walk(CATALOG.Category, (n) => selected.push(n.id));
      state.view = "editor";
      state.screen = "Alert msg 2";
      state.draft = { ...emptyDraft(), items, selectedId: page.id };
      state.picker = { kind: "Category", selected, include: { "k-furn": true, "k-out": true }, expanded: { "k-furn": true, "k-sofas": true, "k-tables": true }, query: "" };
      state.alert = { type: "multil1", count: 47, cap: 50 };
      return;
    }
    state.view = "listing";
  }

  function subtitle(it, ancestors) {
    ancestors = ancestors || [];
    if (it.resourceType === "Custom URL") return "Custom -" + (it.linkTo || "/");
    const kind = it.resourceType === "Category" ? "Category" : it.resourceType;
    const label = it.linkedLabel || it.name;
    if (!ancestors.length) return kind + " - " + label;
    return kind + " " + ancestors.concat([label]).join(" → ");
  }

  function setScreen() {
    if (state.view === "listing") { state.screen = "Listing page"; return; }
    const d = state.draft;
    const sel = findNode(d.items, d.selectedId);
    if (state.alert && state.alert.type === "overcap") { state.screen = "Alert msg 1"; return; }
    if (state.alert && state.alert.type === "multil1") { state.screen = "Alert msg 2"; return; }
    if (d.checked.length && state.bulkMode === 2) { state.screen = "Bulk action idea 2"; return; }
    if (d.checked.length) { state.screen = "Bulk action idea 1"; return; }
    if (state.sortOpen && d.items.length === 0) { state.screen = "Filter page"; return; }
    if (state.rowMenu) { state.screen = "Actions"; return; }
    if (sel && sel.hidden) { state.screen = "Hide Menu"; return; }
    if (state.typeOpen) { state.screen = "Select Resource type"; return; }
    if (state.picker) {
      const k = state.picker.kind;
      if (k === "Pages") { state.screen = "Resource type pages list"; return; }
      if (k === "Blogs") { state.screen = "Resource type blogs list"; return; }
      const anyOpen = Object.values(state.picker.expanded).some(Boolean);
      if (state.picker.selected.length) { state.screen = "Select Nested Category"; return; }
      if (anyOpen) { state.screen = "Open Nested Category"; return; }
      state.screen = "Resource type: category";
      return;
    }
    if (!d.items.length) { state.screen = "New Menu editor page"; return; }
    if (sel && sel.imageSource === "Collection") { state.screen = "Image Source: Collecton"; return; }
    if (sel && sel.imageSource === "Custom") { state.screen = "Image Source: Custom"; return; }
    if (sel && sel.resourceType === "Pages") { state.screen = "Resource type page"; return; }
    if (sel && sel.resourceType === "Blogs") { state.screen = "Resource type blogs"; return; }
    if (sel && sel.resourceType === "Custom URL" && sel.name === "New Page") { state.screen = "Add new menu"; return; }
    if (sel && sel.resourceType === "Custom URL") { state.screen = "Custome URL"; return; }
    if (sel && sel.resourceType === "Category") { state.screen = "Resource type: category"; return; }
    state.screen = "Add new menu";
  }

  function protoBar() {
    const flows = [
      ["a", "A · Add menu"],
      ["b", "B · Image"],
      ["c", "C · Category"],
      ["d", "D · Pages"],
      ["e", "E · Blogs"],
    ];
    const alts = [
      ["bulk1", "Bulk 1"],
      ["bulk2", "Bulk 2"],
      ["alert1", "Alert 1"],
      ["alert2", "Alert 2"],
    ];
    return `
      <div class="dr-proto">
        <strong>Design Ready</strong>
        Clickable HTML · Liquid Sky
        <a href="index.html">Hub</a>
        <span class="sep"></span>
        ${flows.map(([id, label]) => `<button type="button" class="${state.flow === id ? "on" : ""}" data-act="flow" data-id="${id}">${label}</button>`).join("")}
        <span class="sep"></span>
        ${alts.map(([id, label]) => `<button type="button" class="${state.flow === id ? "on" : ""}" data-act="flow" data-id="${id}">${label}</button>`).join("")}
        <a href="https://www.figma.com/design/5Dd6KVq8SSMgZiwzPk4rsE/Navigation-menu-builder?node-id=11100-44617" target="_blank" rel="noopener">Figma</a>
        <span class="dr-screen-tag">${esc(state.screen)}</span>
      </div>`;
  }

  function shell(inner, crumb) {
    const open = state.headerOpen;
    return `
      ${protoBar()}
      <header class="rp-appbar">
        <div class="rp-brand"><img src="icons/logo.png" alt="MAROPOST" /></div>
        <div class="rp-search">
          <i class="mdi mdi-magnify" style="font-size:20px;color:rgba(0,0,0,.38)"></i>
          <input placeholder="Search" />
        </div>
        <div class="rp-abar-right">
          <div style="position:relative">
            <button type="button" class="rp-text-btn" data-act="hdr" data-id="new" style="text-transform:none;letter-spacing:1.2px;font-weight:500;color:rgba(0,0,0,.87)">
              <i class="mdi mdi-lightbulb-on-outline" style="font-size:18px;vertical-align:middle"></i> What’s New?
            </button>
            ${open === "new" ? `<div class="rp-menu" style="right:0;top:44px;min-width:220px">
              <button type="button">Product updates</button>
              <button type="button">Release notes</button>
            </div>` : ""}
          </div>
          <div style="position:relative">
            <button type="button" class="rp-text-btn" data-act="hdr" data-id="acct">
              <i class="mdi mdi-domain" style="font-size:18px;vertical-align:middle"></i> Account name is...
              <i class="mdi mdi-chevron-down"></i>
            </button>
            ${open === "acct" ? `<div class="rp-menu" style="right:0;top:44px">
              <button type="button">Account 2000293</button>
              <button type="button">Switch account</button>
            </div>` : ""}
          </div>
          <button class="rp-icon-btn" type="button" aria-label="Da Vinci"><i class="mdi mdi-creation"></i></button>
          <button class="rp-icon-btn" type="button" aria-label="Help"><i class="mdi mdi-book-open-variant"></i></button>
          <button class="rp-icon-btn" type="button" aria-label="Settings"><i class="mdi mdi-cog-outline"></i></button>
          <div style="position:relative">
            <button type="button" class="rp-profile" data-act="hdr" data-id="prof">
              <span class="rp-avatar"><i class="mdi mdi-account-outline"></i></span>
              Acme Corp India...
              <i class="mdi mdi-chevron-down" style="font-size:18px"></i>
            </button>
            ${open === "prof" ? `<div class="rp-menu" style="right:0;top:56px">
              <button type="button">Profile</button>
              <button type="button">Sign out</button>
            </div>` : ""}
          </div>
        </div>
      </header>
      <div class="rp-body">
        <nav class="rp-rail" aria-label="Storefront">
          <button type="button" class="rp-rail-back" data-act="cancel" aria-label="Back">
            <img src="icons/arrow-back.svg" alt="" width="16" height="16" />
          </button>
          <div class="rp-rail-num"><span>#33</span></div>
          ${RAIL.map((r) => `
            <button type="button" class="rp-rail-item ${r.active ? "active" : ""}" aria-label="${r.label}">
              <img src="${r.src}" alt="" width="24" height="24" />
            </button>`).join("")}
        </nav>
        <main class="rp-main">
          <div class="rp-crumb">
            <button type="button" data-act="cancel">Sales channel</button>
            <span class="sep">&gt;</span> TestStore <span class="sep">&gt;</span> Navigation <span class="sep">&gt;</span>
            <span class="cur">${crumb || ""}</span>
          </div>
          ${inner}
        </main>
      </div>
      ${state.toast ? `<div class="rp-toast">${esc(state.toast)}</div>` : ""}
    `;
  }

  function listingView() {
    const rows = state.menus.map((m) => {
      const inactive = m.status === "Inactive";
      const selected = state.hoverId === m.id;
      return `
        <tr class="${selected ? "is-selected is-hover" : ""} ${inactive ? "is-inactive" : ""}"
            data-act="hover-row" data-id="${m.id}" data-open="${m.id}">
          <td class="${inactive ? "rp-name-muted" : ""}">${esc(m.name)}</td>
          <td>
            <div style="display:flex;flex-wrap:wrap;align-items:center">
              ${m.chips.map((t) => `<span class="rp-chip ${inactive ? "muted" : ""}">${esc(t)}</span>`).join("")}
              ${m.more ? `<button type="button" class="rp-more" data-act="noop">+${m.more} more</button>` : ""}
            </div>
          </td>
          <td style="text-align:center">
            <span class="rp-status ${m.status === "Active" ? "ok" : "err"}">${m.status}</span>
          </td>
          <td style="text-align:right;position:relative">
            <button type="button" class="rp-kebab ${state.listKebab === m.id || selected ? "on" : ""}"
              aria-label="Actions" data-act="list-kebab" data-id="${m.id}">
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            ${state.listKebab === m.id ? `
              <div class="rp-menu" style="right:8px;top:48px">
                <button type="button" data-act="open-menu" data-id="${m.id}">Edit</button>
                <button type="button" class="danger" data-act="delete-menu" data-id="${m.id}">Delete</button>
              </div>` : ""}
          </td>
        </tr>`;
    }).join("");

    const inner = `
      <div class="rp-head">
        <h1>Navigation</h1>
        <button type="button" class="rp-btn primary" data-act="create">Create a menu</button>
      </div>
      <div class="rp-table-wrap" style="box-shadow:0 1px 1.5px rgba(0,0,0,.2),0 2px .5px rgba(0,0,0,.12);border:0;border-radius:4px">
        <table class="rp-table">
          <thead>
            <tr>
              <th>Menu Name <i class="mdi mdi-unfold-more-horizontal" style="font-size:16px;vertical-align:middle"></i></th>
              <th>Menu Items <i class="mdi mdi-unfold-more-horizontal" style="font-size:16px;vertical-align:middle"></i></th>
              <th style="text-align:center">Status</th>
              <th style="text-align:right">Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="rp-foot">
          <span>Rows per page:</span>
          <div style="position:relative">
            <button type="button" class="rp-text-btn" style="height:32px;letter-spacing:.04px;text-transform:none;font-weight:400" data-act="rows-open">
              ${state.rowsPerPage} <i class="mdi mdi-menu-down"></i>
            </button>
            ${state.rowsOpen ? `<div class="rp-menu" style="right:0;bottom:36px">
              ${[10, 25, 50, 100].map((n) => `<button type="button" class="${n === state.rowsPerPage ? "is-active" : ""}" data-act="rows" data-n="${n}">${n}</button>`).join("")}
            </div>` : ""}
          </div>
          <span>1–10 of 100</span>
          <button type="button" class="rp-page-btn" disabled aria-label="Previous page"><i class="mdi mdi-chevron-left"></i></button>
          <button type="button" class="rp-page-btn" aria-label="Next page"><i class="mdi mdi-chevron-right"></i></button>
        </div>
      </div>`;
    return shell(inner, "");
  }

  function levelPill(depth) {
    const d = Math.min(depth, 3);
    return `<span class="rp-level l${d}">L${d}</span>`;
  }

  function switchHtml(on, act, id, sm) {
    return `<button type="button" role="switch" aria-checked="${on}" class="rp-switch ${sm ? "sm" : ""} ${on ? "on" : ""}" data-act="${act}" data-id="${id || ""}"><i></i></button>`;
  }

  function field(label, value, act, opts) {
    opts = opts || {};
    return `
      <label class="rp-field ${opts.error ? "error" : ""}">
        <span>${esc(label)}</span>
        <input id="${opts.id || ""}" value="${esc(value)}" placeholder="${esc(opts.placeholder || label)}"
          ${opts.readOnly ? "readonly" : ""} data-act="${act}" ${opts.id ? "" : ""} />
        ${opts.error ? `<span class="err">Enter a menu name</span>` : ""}
      </label>`;
  }

  function includedLabel(n) {
    const desc = countDesc(n);
    const direct = (n.children || []).length;
    if (!direct) return "—";
    if (n.childTotal) {
      const cats = (n.children || []).filter((c) => (c.children || []).length).length;
      if (cats) return desc + " of " + n.childTotal + "  (" + cats + " " + (cats === 1 ? "category" : "categories") + ")";
      return desc + " of " + n.childTotal;
    }
    return String(desc);
  }

  function locate(nodes, id, parent) {
    parent = parent || null;
    for (let i = 0; i < (nodes || []).length; i++) {
      if (nodes[i].id === id) return { list: nodes, index: i, parent: parent };
      const found = locate(nodes[i].children || [], id, nodes[i]);
      if (found) return found;
    }
    return null;
  }

  function depthOf(id) {
    const hit = flatten(state.draft.items).find((x) => x.n.id === id);
    return hit ? hit.depth : 1;
  }

  function maxRelDepth(node) {
    let max = 1;
    walk(node.children || [], function (_n, _p, d) { max = Math.max(max, d); }, node, 2);
    return max;
  }

  function flash(msg) {
    state.toast = msg;
    render();
    setTimeout(function () {
      if (state.toast === msg) { state.toast = ""; render(); }
    }, 1600);
  }

  function indentItem(id) {
    const loc = locate(state.draft.items, id);
    if (!loc || loc.index === 0) { flash("Nothing to indent under"); return; }
    const node = loc.list[loc.index];
    if (depthOf(id) + maxRelDepth(node) > 3) { flash("Max nesting is L3"); return; }
    loc.list.splice(loc.index, 1);
    const prev = loc.list[loc.index - 1];
    prev.children = prev.children || [];
    prev.children.push(node);
    state.draft.selectedId = id;
    state.rowMenu = null;
    flash("Indented");
  }

  function outdentItem(id) {
    const loc = locate(state.draft.items, id);
    if (!loc || !loc.parent) { flash("Already top level"); return; }
    const parentLoc = locate(state.draft.items, loc.parent.id);
    const node = loc.list.splice(loc.index, 1)[0];
    parentLoc.list.splice(parentLoc.index + 1, 0, node);
    state.draft.selectedId = id;
    state.rowMenu = null;
    flash("Outdented");
  }

  function cloneTree(nodes) {
    return JSON.parse(JSON.stringify(nodes || []));
  }

  function typeSnapshot(n) {
    return {
      name: n.name,
      linkTo: n.linkTo || "",
      linkedLabel: n.linkedLabel || "",
      linkedIds: (n.linkedIds || []).slice(),
      children: cloneTree(n.children || []),
      childTotal: n.childTotal,
      includeChildren: !!n.includeChildren,
      imageSource: n.imageSource || "None",
      customImage: n.customImage || "",
    };
  }

  function rememberType(n) {
    const saved = Object.assign({}, n.savedTypes);
    saved[n.resourceType] = typeSnapshot(n);
    return saved;
  }

  function switchResourceType(typ) {
    const sel = findNode(state.draft.items, state.draft.selectedId);
    if (!sel) return;
    state.typeOpen = false;
    if (state.picker) {
      state.pickerByType[state.picker.kind] = {
        selected: state.picker.selected.slice(),
        include: Object.assign({}, state.picker.include),
        expanded: Object.assign({}, state.picker.expanded),
        query: state.picker.query || "",
      };
    }
    if (sel.resourceType === typ) {
      if (PICKER_TYPES.includes(typ) && state.pickerByType[typ]) {
        state.picker = Object.assign({ kind: typ }, state.pickerByType[typ]);
      }
      render();
      return;
    }
    const saved = rememberType(sel);
    const prev = saved[typ];
    const patch = { resourceType: typ, savedTypes: saved };
    if (prev) {
      patch.linkTo = prev.linkTo;
      patch.linkedLabel = prev.linkedLabel;
      patch.linkedIds = prev.linkedIds;
      patch.childTotal = prev.childTotal;
      patch.includeChildren = prev.includeChildren;
      patch.imageSource = prev.imageSource;
      patch.customImage = prev.customImage;
      if (prev.name) patch.name = prev.name;
      if (prev.children && prev.children.length) patch.children = prev.children;
    } else {
      patch.linkedLabel = "";
      patch.linkedIds = [];
      patch.linkTo = typ === "Custom URL" ? (sel.linkTo || "/") : "";
      patch.childTotal = sel.childTotal;
      patch.includeChildren = sel.includeChildren;
      if (typ === "Home page") patch.linkTo = "/";
      if (typ === "Search") patch.linkTo = "/search";
    }
    patchSelected(patch);
    const pending = state.pickerByType[typ];
    const restored = prev && ((prev.linkedIds && prev.linkedIds.length) || (prev.children && prev.children.length));
    if (PICKER_TYPES.includes(typ)) {
      if (pending && pending.selected && pending.selected.length) {
        state.picker = { kind: typ, selected: pending.selected, include: pending.include || {}, expanded: pending.expanded || {}, query: pending.query || "" };
      } else if (restored) {
        state.picker = null;
      } else {
        state.picker = { kind: typ, selected: [], include: {}, expanded: {}, query: "" };
      }
    } else {
      state.picker = null;
    }
    flash("Saved · " + typ);
  }

  function isInside(root, id) {
    let hit = false;
    walk(root.children || [], (n) => { if (n.id === id) hit = true; });
    return hit;
  }

  function canDrop(sourceId, targetId, pos) {
    if (!sourceId || !targetId || sourceId === targetId) return false;
    const src = findNode(state.draft.items, sourceId);
    const tgt = findNode(state.draft.items, targetId);
    if (!src || !tgt) return false;
    if (isInside(src, targetId)) return false;
    const sub = maxRelDepth(src);
    if (pos === "inside") return depthOf(targetId) + sub <= 3;
    return depthOf(targetId) + sub - 1 <= 3;
  }

  function moveItem(sourceId, targetId, pos) {
    if (!canDrop(sourceId, targetId, pos)) {
      flash("Stay within L1–L3");
      return false;
    }
    const loc = locate(state.draft.items, sourceId);
    if (!loc) return false;
    const node = loc.list.splice(loc.index, 1)[0];
    const tloc = locate(state.draft.items, targetId);
    if (!tloc) {
      loc.list.splice(loc.index, 0, node);
      flash("Stay within L1–L3");
      return false;
    }
    if (pos === "inside") {
      const parent = tloc.list[tloc.index];
      parent.children = parent.children || [];
      parent.children.push(node);
    } else if (pos === "before") {
      tloc.list.splice(tloc.index, 0, node);
    } else {
      tloc.list.splice(tloc.index + 1, 0, node);
    }
    state.draft.selectedId = sourceId;
    state.rowMenu = null;
    flash(pos === "inside" ? "Indented" : pos === "before" || !tloc.parent ? "Moved" : "Outdented");
    return true;
  }

  let dragId = null;
  let dropPos = null;
  let skipClick = false;

  function clearDropClasses() {
    document.querySelectorAll(".rp-row").forEach((r) => {
      r.classList.remove("drop-before", "drop-after", "drop-inside", "dragging");
    });
  }

  function resolveDropZone(row, clientY) {
    const rect = row.getBoundingClientRect();
    const y = clientY - rect.top;
    const h = rect.height || 1;
    if (y < h * 0.28) return "before";
    if (y > h * 0.72) return "after";
    return "inside";
  }

  function bindTreeDnD() {
    const list = document.querySelector(".rp-tree-list");
    if (!list) return;
    list.querySelectorAll(".rp-row").forEach((row) => {
      const handle = row.querySelector(".rp-drag");
      if (!handle) return;
      handle.addEventListener("mousedown", () => {
        row.setAttribute("draggable", "true");
      });
      row.addEventListener("dragstart", (e) => {
        if (row.getAttribute("draggable") !== "true") {
          e.preventDefault();
          return;
        }
        dragId = row.getAttribute("data-id");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", dragId);
        row.classList.add("dragging");
      });
      row.addEventListener("dragend", () => {
        dragId = null;
        dropPos = null;
        row.removeAttribute("draggable");
        clearDropClasses();
        skipClick = true;
        setTimeout(() => { skipClick = false; }, 0);
      });
      row.addEventListener("dragover", (e) => {
        if (!dragId) return;
        const tid = row.getAttribute("data-id");
        let pos = resolveDropZone(row, e.clientY);
        if (!canDrop(dragId, tid, pos) && pos === "inside") {
          const mid = row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2;
          pos = e.clientY < mid ? "before" : "after";
        }
        if (!canDrop(dragId, tid, pos)) {
          e.dataTransfer.dropEffect = "none";
          row.classList.remove("drop-before", "drop-after", "drop-inside");
          return;
        }
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        dropPos = pos;
        clearDropClasses();
        const dragging = list.querySelector('.rp-row[data-id="' + dragId + '"]');
        if (dragging) dragging.classList.add("dragging");
        row.classList.add("drop-" + pos);
      });
      row.addEventListener("dragleave", (e) => {
        if (!row.contains(e.relatedTarget)) {
          row.classList.remove("drop-before", "drop-after", "drop-inside");
        }
      });
      row.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tid = row.getAttribute("data-id");
        const pos = dropPos || resolveDropZone(row, e.clientY);
        const sid = dragId || e.dataTransfer.getData("text/plain");
        clearDropClasses();
        moveItem(sid, tid, pos);
        dragId = null;
        dropPos = null;
        render();
      });
    });
  }

  function treeRows(nodes, depth, ancestors) {
    depth = depth || 1;
    ancestors = ancestors || [];
    return nodes.map((n) => {
      const checked = state.draft.checked.includes(n.id);
      const kids = (n.children || []).length;
      const loc = locate(state.draft.items, n.id);
      const canIndent = loc && loc.index > 0 && depth + maxRelDepth(n) <= 3;
      const canOutdent = !!(loc && loc.parent);
      const open = state.rowMenu === n.id;
      return `
        <div class="rp-row ${n.id === state.draft.selectedId ? "selected" : ""} ${n.hidden ? "hidden-item" : ""}"
          style="padding-left:${16 + (depth - 1) * 20}px" data-act="select-row" data-id="${n.id}">
          <input type="checkbox" ${checked ? "checked" : ""} data-act="check" data-id="${n.id}" />
              <span class="rp-drag" title="Drag to reorder" data-act="noop" aria-label="Drag">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 8C10.1 8 11 7.1 11 6C11 4.9 10.1 4 9 4C7.9 4 7 4.9 7 6C7 7.1 7.9 8 9 8ZM9 10C7.9 10 7 10.9 7 12C7 13.1 7.9 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10ZM9 16C7.9 16 7 16.9 7 18C7 19.1 7.9 20 9 20C10.1 20 11 19.1 11 18C11 16.9 10.1 16 9 16Z" fill="currentColor"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C17.1 8 18 7.1 18 6C18 4.9 17.1 4 16 4C14.9 4 14 4.9 14 6C14 7.1 14.9 8 16 8ZM16 10C14.9 10 14 10.9 14 12C14 13.1 14.9 14 16 14C17.1 14 18 13.1 18 12C18 10.9 17.1 10 16 10ZM16 16C14.9 16 14 16.9 14 18C14 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z" fill="currentColor"/>
                </svg>
              </span>
              <div>
            <div class="nm">
              ${esc(n.name)}
              ${n.hidden ? `<span class="rp-hidden-tag">Hidden</span>` : ""}
            </div>
            <div class="sub">${esc(subtitle(n, ancestors))}</div>
          </div>
          <div class="rp-included">${esc(includedLabel(n))}</div>
          ${(kids || depth > 1 || n.name !== "New Page") ? levelPill(depth) : `<span style="color:rgba(0,0,0,.32)">—</span>`}
          <div class="rp-row-act">
            <button type="button" class="rp-kebab ${open ? "on" : ""}" aria-label="Item actions" data-act="row-menu" data-id="${n.id}">
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            ${open ? `<div class="rp-menu rp-action-menu" data-act="noop">
              <button type="button" ${canIndent ? "" : "disabled"} data-act="indent" data-id="${n.id}">Indent</button>
              <button type="button" ${canOutdent ? "" : "disabled"} data-act="outdent" data-id="${n.id}">Outdent</button>
              <button type="button" data-act="hide-item" data-id="${n.id}">${n.hidden ? "Unhide" : "Hide"}</button>
              <button type="button" class="danger" data-act="remove-item" data-id="${n.id}">Remove from menu</button>
            </div>` : ""}
          </div>
        </div>
        ${kids ? treeRows(n.children, depth + 1, ancestors.concat([n.linkedLabel || n.name])) : ""}
      `;
    }).join("");
  }

  function catalogDescendantIds(kind, id) {
    const node = catalogFind(kind, id);
    const ids = [];
    walk((node && node.children) || [], (n) => ids.push(n.id));
    return ids;
  }

  function pickerHtml() {
    const p = state.picker;
    if (!p) return "";
    const catalog = CATALOG[p.kind] || [];
    const q = (p.query || "").toLowerCase();

    function vis(nodes, depth) {
      depth = depth || 1;
      return nodes
        .filter((n) => !q || n.name.toLowerCase().includes(q) || (n.children || []).some((c) => c.name.toLowerCase().includes(q)))
        .map((n) => ({
          ...n,
          depth,
          visKids: vis(n.children || [], depth + 1),
          count: n.kids || (n.children || []).length,
        }));
    }
    const rows = vis(catalog);

    function render(list) {
      return list.map((n) => {
        const open = p.expanded[n.id] === true;
        const hasKids = n.visKids.length > 0 || n.count > 0;
        const on = p.selected.includes(n.id);
        const pad = (n.depth - 1) * 16;
        const kidIds = catalogDescendantIds(p.kind, n.id);
        const allKidsOn = kidIds.length > 0 && kidIds.every((k) => p.selected.includes(k));
        let includeCell = `<span class="rp-inc-empty">—</span>`;
        if (hasKids && !on) {
          includeCell = `<span class="rp-inc-count">${n.count || kidIds.length}</span>`;
        } else if (hasKids && on) {
          includeCell = `<button type="button" class="rp-inc-link" data-act="pick-inc" data-id="${n.id}">${allKidsOn ? "Remove children" : "Include Children"}</button>`;
        }
        return `
          <div>
            <div class="rp-pick-row ${on ? "is-on" : ""}" style="padding-left:${pad}px">
              <input type="checkbox" ${on ? "checked" : ""} data-act="pick-check" data-id="${n.id}" />
              ${n.visKids.length
                ? `<button type="button" class="rp-chev" data-act="pick-exp" data-id="${n.id}"><i class="mdi ${open ? "mdi-chevron-down" : "mdi-chevron-right"}"></i></button>`
                : `<span></span>`}
              <span class="rp-pick-name">${esc(n.name)}</span>
              ${includeCell}
              ${levelPill(n.depth)}
            </div>
            ${n.visKids.length && open ? render(n.visKids) : ""}
          </div>`;
      }).join("");
    }

    const colLabel = p.kind === "Pages" || p.kind === "Blogs" ? "Children" : "Include Children";
    const alertBox = state.alert ? alertHtml() : "";

    return `
      <div class="rp-picker">
        <div class="rp-picker-head">
          <b>Choose collection</b>
          <button type="button" class="rp-select-btn" style="position:static;height:36px;width:auto;min-width:120px;padding:0 10px" data-act="noop">
            ${esc(state.draft.sort)} <i class="mdi mdi-chevron-down"></i>
          </button>
          <button type="button" class="rp-expand" data-act="expand-all">Expand all</button>
        </div>
        <div class="rp-search-mini" style="margin-bottom:8px">
          <i class="mdi mdi-magnify" style="color:rgba(0,0,0,.38)"></i>
          <input placeholder="Search" value="${esc(p.query)}" data-act="pick-query" />
        </div>
        <div class="rp-pick-cols"><span></span><span></span><span>Item</span><span>${colLabel}</span><span>Level</span></div>
        <div style="max-height:320px;overflow:auto">${render(rows)}</div>
        ${alertBox}
        <button type="button" class="rp-btn primary rp-apply" data-act="apply-picker">Apply to menu</button>
      </div>`;
  }

  function alertHtml() {
    const a = state.alert;
    if (!a) return "";
    if (a.type === "multil1") {
      return `
        <div class="dr-alert multi">
          <p><b>47</b> selected across <b>3</b> L1 parents — only <b>50</b> can show</p>
          <ul class="break">
            <li><span class="dot l1"></span><b>Furniture</b> 10 → L3</li>
            <li><span class="dot l2"></span><b>Outdoor</b> 28 → L2</li>
            <li><span class="dot l3"></span><b>Sale</b> 4 → L1 only</li>
          </ul>
          <p style="color:rgba(0,0,0,.6);font-size:12px">Nesting stays under each parent. Cap applies to this Apply total. Shoppers can click “See more” to view the rest.</p>
          <div class="acts">
            <button type="button" class="rp-btn primary" data-act="apply-cap" data-n="20">Add first 20</button>
            <button type="button" class="rp-btn" data-act="apply-cap" data-n="10">Add first 10</button>
            <button type="button" class="rp-btn" data-act="alert-cancel">Cancel</button>
          </div>
        </div>`;
    }
    return `
      <div class="dr-alert">
        <p><b>${a.count}</b> Selected items — only <b>${a.cap}</b> will show</p>
        <p style="color:rgba(0,0,0,.6);font-size:12px">Storefront displays the first ${a.cap} items per menu. Shoppers can click “See more” to view the rest.</p>
        <div class="acts">
          <button type="button" class="rp-btn primary" data-act="apply-cap" data-n="20">Add first 20</button>
          <button type="button" class="rp-btn" data-act="apply-cap" data-n="10">Add first 10</button>
          <button type="button" class="rp-btn" data-act="alert-cancel">Cancel</button>
        </div>
      </div>`;
  }

  function detailsHtml(sel) {
    if (!sel) {
      return `
        <h3>Item Details</h3>
        <p class="hint">Select a menu item to edit label, link, and image.</p>
        <div class="rp-details-empty">
          <i class="mdi mdi-playlist-remove rp-empty-icon"></i>
          <b>Nothing selected yet</b>
          <p>Select a menu item to edit label, link, and image.</p>
        </div>`;
    }
    const note = IMAGE_NOTES[sel.imageSource] || IMAGE_NOTES.None;
    const pickerKind = PICKER_TYPES.includes(sel.resourceType);
    const showHide = sel.name && sel.name !== "New Page";
    const typeNote = TYPE_NOTES[sel.resourceType];
    const pickerBtn = pickerKind
      ? (sel.resourceType === "Pages" ? "Choose pages" : sel.resourceType === "Blogs" ? "Choose blogs" : sel.resourceType === "Collection" ? "Choose collection" : "Choose collection")
      : "";
    return `
      <h3>Item details</h3>
      <p class="hint">Feeds storefront mega menu configuration</p>
      <div class="rp-fields">
        ${field("Menu page name", sel.name === "New Page" ? "" : sel.name, "patch-name", { placeholder: "Menu page name", id: "fld-name" })}
        <div class="rp-field">
          <span>Resource type</span>
          <button type="button" class="rp-select-btn" data-act="toggle-type">
            ${esc(sel.resourceType)} <i class="mdi mdi-chevron-down"></i>
          </button>
          ${state.typeOpen ? `<div class="rp-menu" style="width:100%;top:62px;z-index:50">
            ${RESOURCE_TYPES.map((t) => `<button type="button" class="${t === sel.resourceType ? "is-active" : ""}" data-act="set-type" data-t="${esc(t)}">${esc(t)}</button>`).join("")}
          </div>` : ""}
        </div>
        ${sel.resourceType === "Custom URL" ? field("Link to", sel.linkTo === "/" ? "" : sel.linkTo, "patch-link", { placeholder: "Link to", id: "fld-link" }) : ""}
        ${typeNote ? `
          <div class="rp-note">
            <i class="mdi mdi-information-outline" style="font-size:18px"></i>
            <span><b style="display:block;color:rgba(0,0,0,.87);font-weight:500">${esc(typeNote.title)}</b>${esc(typeNote.body)}</span>
          </div>` : ""}
        ${pickerKind ? `
          ${sel.linkedLabel ? field("Linked Resources", (sel.resourceType === "Category" ? "Collection" : sel.resourceType) + " - " + sel.linkedLabel, "noop", { readOnly: true }) : ""}
          ${!state.picker ? `<button type="button" class="rp-btn" style="width:100%" data-act="open-picker">${sel.linkedLabel ? "Change selection" : pickerBtn}</button>` : ""}
          ${pickerHtml()}
        ` : ""}
        <div>
          <p style="margin:0 0 8px;font-size:12px;color:rgba(0,0,0,.6)">Image source</p>
          <div class="rp-seg">
            ${["Collection", "Custom", "None"].map((opt) => `
              <button type="button" class="${sel.imageSource === opt ? "on" : ""}" data-act="img-src" data-t="${opt}">${opt}</button>
            `).join("")}
          </div>
          ${sel.imageSource === "Custom" ? `
            <div class="rp-upload">
              <b>${note.title}</b>
              <p>${note.body}</p>
              <label class="rp-file"><input type="file" accept="image/*" data-act="upload" />Choose file</label>
              ${sel.customImage ? `<img class="rp-thumb" style="margin-top:8px" src="${sel.customImage}" alt="" />` : ""}
            </div>` : `
            <div class="rp-note ${sel.imageSource === "Collection" ? "collection" : ""}">
              <i class="mdi ${note.icon}" style="font-size:18px"></i>
              <span><b style="display:block;color:rgba(0,0,0,.87);font-weight:500">${note.title}</b>${note.body}</span>
            </div>`}
        </div>
        <div class="rp-details-foot">
          ${showHide ? `<button type="button" class="rp-btn" data-act="hide-selected">${sel.hidden ? "Unhide on storefront" : "Hide on storefront"}</button>` : ""}
          <button type="button" class="rp-btn" data-act="remove-selected">Remove from menu</button>
        </div>
      </div>
      ${state.loading ? `<div class="rp-loading"><div class="rp-spinner"></div></div>` : ""}
    `;
  }

  function editorView() {
    const d = state.draft;
    const sel = findNode(d.items, d.selectedId);
    const flat = flatten(d.items);
    const allIds = flat.map((x) => x.n.id);
    const some = d.checked.length > 0 && d.checked.length < allIds.length;
    const all = allIds.length > 0 && d.checked.length === allIds.length;

    let items = d.items.slice();
    if (d.sort === "A → Z") items = items.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (d.sort === "Z → A") items = items.slice().sort((a, b) => b.name.localeCompare(a.name));
    if (d.sort === "Old → New") items = items.slice().reverse();

    const bulk = d.checked.length ? `
      <div class="rp-bulk ${state.bulkMode === 2 ? "idea2" : ""}">
        <span style="font-size:14px;font-weight:500">${d.checked.length} selected</span>
        ${state.bulkMode === 2 ? `<button type="button" class="rp-select-all" data-act="select-all">Select all (100)</button>` : ""}
        <div style="margin-left:auto;display:flex;gap:8px">
          <button type="button" class="rp-btn ghost" data-act="bulk" data-t="hide">Hide</button>
          <button type="button" class="rp-btn ghost" data-act="bulk" data-t="remove">Remove</button>
          <button type="button" class="rp-btn ghost" data-act="bulk" data-t="clear">Clear</button>
        </div>
      </div>` : "";

    const inner = `
      <div class="rp-editor-head">
        <h1>Create new Navigation</h1>
        <div style="width:280px">${field("Menu Name", d.menuName, "menu-name", { id: "fld-menu", error: d.nameError })}</div>
        <div style="display:flex;align-items:center;gap:8px;padding-bottom:12px">
          <span style="font-size:14px">${d.active ? "Active" : "Inactive"}</span>
          ${switchHtml(d.active, "toggle-active")}
        </div>
        <div class="ml-auto" style="display:flex;gap:8px;padding-bottom:8px;margin-left:auto">
          <button type="button" class="rp-btn" data-act="preview"><i class="mdi mdi-eye-outline" style="font-size:16px"></i> Preview</button>
          <button type="button" class="rp-btn" data-act="cancel">Cancel</button>
          <button type="button" class="rp-btn primary" data-act="save">Save</button>
        </div>
      </div>
      <div class="rp-split">
        <section class="rp-tree">
          <div class="rp-tree-bar">
            <h2>Menu structure</h2>
            <div style="position:relative">
              <button type="button" class="rp-select-btn" style="position:static;height:40px;width:auto;min-width:140px;padding:0 12px" data-act="toggle-sort">
                ${esc(d.sort)} <i class="mdi mdi-chevron-down"></i>
              </button>
              ${state.sortOpen ? `<div class="rp-menu" style="min-width:160px">
                ${SORTS.map((s) => `<button type="button" class="${s === d.sort ? "is-active" : ""}" data-act="set-sort" data-t="${esc(s)}">${esc(s)}</button>`).join("")}
              </div>` : ""}
            </div>
            <div style="margin-left:auto">
              <button type="button" class="rp-btn primary" data-act="add-new">Add new</button>
            </div>
          </div>
          ${bulk}
          ${d.items.length === 0 ? `
            <div class="rp-empty">
              <h3>Build your storefront menu</h3>
              <p>Add collections in bulk, or add a single item. Nested children can be pulled from your catalog.</p>
            </div>` : `
            <div class="rp-tree-list">
              <div class="rp-cols">
                <input type="checkbox" ${all ? "checked" : ""} ${some ? `class="indeterminate"` : ""} data-act="check-all" ${some ? `data-indeterminate="1"` : ""} />
                <span></span>
                <span>Item</span>
                <span>${flatten(items).some((x) => (x.n.children || []).length) ? "Included" : "Include children"}</span>
                <span>Level</span>
                <span></span>
              </div>
              ${treeRows(items, 1)}
            </div>`}
        </section>
        <aside class="rp-details">${detailsHtml(sel)}</aside>
      </div>
      ${state.preview ? `
        <div class="rp-modal" data-act="close-preview">
          <div class="rp-modal-card" style="padding:0;overflow:hidden">
            <div class="rp-preview-nav">
              ${flatten(d.items).filter((x) => x.depth === 1 && !x.n.hidden).map((x) => `<span>${esc(x.n.name)}</span>`).join("") || "<span>Empty menu</span>"}
            </div>
            <div style="padding:16px 20px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <h3 style="margin:0;font-size:16px;font-weight:500">Theme preview</h3>
                <button type="button" data-act="close-preview" aria-label="Close" style="border:0;background:none;cursor:pointer"><i class="mdi mdi-close"></i></button>
              </div>
              <ul style="margin:0;padding:0;list-style:none">
                ${flatten(d.items).filter((x) => !x.n.hidden).map((x) => `<li style="padding:6px 0 6px ${(x.depth - 1) * 16}px;font-size:14px">${esc(x.n.name)}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>` : ""}
    `;
    return shell(inner, "Create New");
  }

  function render() {
    setScreen();
    const app = document.getElementById("app");
    const active = document.activeElement;
    const aid = active && active.id;
    const start = active && active.selectionStart;
    app.innerHTML = state.view === "listing" ? listingView() : editorView();
    const ind = app.querySelector("[data-indeterminate]");
    if (ind) ind.indeterminate = true;
    if (aid) {
      const el = document.getElementById(aid);
      if (el && typeof start === "number") {
        el.focus();
        try { el.setSelectionRange(start, start); } catch (e) {}
      }
    }
    bindTreeDnD();
  }

  function patchSelected(patch) {
    const id = state.draft.selectedId;
    state.draft.items = mapTree(state.draft.items, (n) => (n.id === id ? { ...n, ...patch } : n));
  }

  function stripId(nodes, id) {
    return nodes.filter((n) => n.id !== id).map((n) => ({ ...n, children: stripId(n.children || [], id) }));
  }

  function applyPicker(limit) {
    const p = state.picker;
    const sel = findNode(state.draft.items, state.draft.selectedId);
    if (!p || !sel) return;
    let pickedIds = p.selected.slice();
    if (limit) pickedIds = pickedIds.slice(0, limit);
    const picked = [];
    walk(CATALOG[p.kind] || [], (n) => { if (pickedIds.includes(n.id)) picked.push(n); });
    const label = picked.map((x) => x.name).join(", ");
    function toItems(nodes, forceAll) {
      return (nodes || []).reduce(function (acc, n) {
        const takeAllKids = !!p.include[n.id];
        const children = toItems(n.children || [], takeAllKids);
        if (forceAll || pickedIds.includes(n.id) || children.length) {
          acc.push(item({
            name: n.name,
            resourceType: p.kind,
            linkedLabel: n.name,
            linkedIds: [n.id],
            imageSource: "Collection",
            includeChildren: takeAllKids,
            childTotal: n.kids || (n.children || []).length || undefined,
            children: children,
          }));
        }
        return acc;
      }, []);
    }
    const nested = toItems(CATALOG[p.kind] || []);
    const selDepth = depthOf(sel.id) || 1;
    function trimToLevel(nodes, nodeDepth) {
      return (nodes || []).reduce(function (acc, n) {
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
      walk([node], function (n) {
        (n.linkedIds || []).forEach(function (cid) {
          if (ids.indexOf(cid) < 0) ids.push(cid);
        });
      });
      return ids;
    }
    const forest = trimToLevel(nested, selDepth);
    if (!forest.length) {
      patchSelected({
        linkedLabel: label || sel.linkedLabel,
        linkedIds: pickedIds,
        resourceType: p.kind,
      });
    } else {
      const first = forest[0];
      const rest = forest.slice(1);
      patchSelected({
        name: first.name,
        linkedLabel: first.linkedLabel,
        linkedIds: collectLinkedIds(first),
        resourceType: p.kind,
        imageSource: first.imageSource || "Collection",
        includeChildren: !!first.includeChildren,
        childTotal: first.childTotal,
        children: first.children || [],
      });
      if (rest.length) {
        const loc = locate(state.draft.items, state.draft.selectedId);
        if (loc) loc.list.splice.apply(loc.list, [loc.index + 1, 0].concat(rest));
      }
    }
    const now = findNode(state.draft.items, state.draft.selectedId);
    if (now) patchSelected({ savedTypes: rememberType(now) });
    state.picker = null;
    state.alert = null;
    if (state.pickerByType) delete state.pickerByType[p.kind];
    if (p.kind === "Pages") state.screen = "Resource type pages selected/ added to menu";
    if (p.kind === "Blogs") state.screen = "Resource type blogs selected/ added to menu";
    if (p.kind === "Category") state.screen = "Seleced item Add to Menu";
    flash("Saved · " + p.kind);
  }

  function tryApply() {
    if (!state.picker) return;
    const n = state.picker.selected.length;
    if (state.alert) return;
    if (n > 20) { state.alert = { type: "overcap", count: n, cap: 20 }; render(); return; }
    if (n > 10) { state.alert = { type: "overcap", count: n, cap: 10 }; render(); return; }
    state.loading = true;
    render();
    setTimeout(() => { state.loading = false; applyPicker(); render(); }, 350);
  }

  function openListingMenu(menuId) {
    const m = state.menus.find((x) => x.id === menuId);
    if (!m) return;
    state.editingId = m.id;
    const items = m.name === "Draft" ? furnitureTree() : [contactItem({ name: m.chips[0] || "Home" })];
    state.draft = { ...emptyDraft(), menuName: m.name, active: m.status === "Active", items, selectedId: items[0].id };
    state.view = "editor";
    state.listKebab = null;
    render();
  }

  function saveMenu() {
    if (!state.draft.menuName.trim()) {
      state.draft.nameError = true;
      render();
      return;
    }
    const preview = flatten(state.draft.items).filter((x) => x.depth === 1).map((x) => x.n.name).slice(0, 8);
    const rec = {
      id: state.editingId || uid(),
      name: state.draft.menuName,
      status: state.draft.active ? "Active" : "Inactive",
      chips: preview.length ? preview : ["—"],
    };
    if (state.editingId) state.menus = state.menus.map((m) => (m.id === state.editingId ? rec : m));
    else state.menus = [rec, ...state.menus];
    state.view = "listing";
    state.toast = "Menu saved";
    setTimeout(() => { state.toast = ""; render(); }, 1800);
    render();
  }

  function onClick(e) {
    if (skipClick) return;
    const t = e.target.closest("[data-act]");
    if (!t) {
      const close = state.rowMenu || state.listKebab || state.headerOpen || state.sortOpen || state.typeOpen || state.rowsOpen;
      if (close && !e.target.closest(".rp-menu") && !e.target.closest(".rp-kebab") && !e.target.closest(".rp-select-btn")) {
        state.rowMenu = null;
        state.listKebab = null;
        state.headerOpen = null;
        state.sortOpen = false;
        state.typeOpen = false;
        state.rowsOpen = false;
        render();
      }
      return;
    }
    const act = t.getAttribute("data-act");
    const id = t.getAttribute("data-id");
    e.stopPropagation();
    if (act === "noop") return;

    if (act === "flow") {
      seedFlow(t.getAttribute("data-id"));
      try { history.replaceState({}, "", "?flow=" + t.getAttribute("data-id")); } catch (err) {}
      render();
      return;
    }
    if (act === "hdr") {
      state.headerOpen = state.headerOpen === id ? null : id;
      render(); return;
    }
    if (act === "create") {
      state.editingId = null;
      state.draft = emptyDraft();
      state.view = "editor";
      render(); return;
    }
    if (act === "cancel") {
      state.view = "listing";
      state.picker = null;
      state.alert = null;
      flash("Cancelled");
      return;
    }
    if (act === "hover-row") {
      if (!e.target.closest("[data-act=list-kebab]") && !e.target.closest(".rp-menu") && !e.target.closest(".rp-more")) {
        openListingMenu(id);
      }
      return;
    }
    if (act === "open-menu") { openListingMenu(id); return; }
    if (act === "list-kebab") {
      e.preventDefault();
      state.listKebab = state.listKebab === id ? null : id;
      render(); return;
    }
    if (act === "delete-menu") {
      state.menus = state.menus.filter((m) => m.id !== id);
      state.listKebab = null;
      flash("Menu deleted");
      return;
    }
    if (act === "rows-open") { state.rowsOpen = !state.rowsOpen; render(); return; }
    if (act === "rows") { state.rowsPerPage = Number(t.getAttribute("data-n")); state.rowsOpen = false; render(); return; }
    if (act === "toggle-active") { state.draft.active = !state.draft.active; render(); return; }
    if (act === "toggle-sort") { state.sortOpen = !state.sortOpen; state.typeOpen = false; render(); return; }
    if (act === "set-sort") { state.draft.sort = t.getAttribute("data-t"); state.sortOpen = false; render(); return; }
    if (act === "add-new") {
      const next = item({ name: "New Page", linkTo: "/" });
      state.draft.items = [...state.draft.items, next];
      state.draft.selectedId = next.id;
      state.picker = null;
      render(); return;
    }
    if (act === "select-row") {
      if (state.picker) {
        state.pickerByType[state.picker.kind] = {
          selected: state.picker.selected.slice(),
          include: Object.assign({}, state.picker.include),
          expanded: Object.assign({}, state.picker.expanded),
          query: state.picker.query || "",
        };
      }
      if (state.draft.selectedId !== id) state.picker = null;
      state.draft.selectedId = id;
      state.rowMenu = null;
      render(); return;
    }
    if (act === "check") {
      const node = findNode(state.draft.items, id);
      const on = state.draft.checked.includes(id);
      const next = new Set(state.draft.checked);
      if (on) { [id, ...descendantsOf(node)].forEach((x) => next.delete(x)); }
      else { next.add(id); ancestorsOf(state.draft.items, id).forEach((x) => next.add(x)); }
      state.draft.checked = [...next];
      render(); return;
    }
    if (act === "check-all") {
      const allIds = flatten(state.draft.items).map((x) => x.n.id);
      const all = state.draft.checked.length === allIds.length;
      state.draft.checked = all ? [] : allIds;
      render(); return;
    }
    if (act === "select-all") {
      state.draft.checked = flatten(state.draft.items).map((x) => x.n.id);
      render(); return;
    }
    if (act === "include") {
      state.draft.items = mapTree(state.draft.items, (n) => (n.id === id ? { ...n, includeChildren: !n.includeChildren } : n));
      render(); return;
    }
    if (act === "row-menu") { state.rowMenu = state.rowMenu === id ? null : id; render(); return; }
    if (act === "indent") { indentItem(id); return; }
    if (act === "outdent") { outdentItem(id); return; }
    if (act === "hide-item") {
      state.draft.items = mapTree(state.draft.items, (n) => (n.id === id ? { ...n, hidden: !n.hidden } : n));
      state.draft.selectedId = id;
      state.rowMenu = null;
      const now = findNode(state.draft.items, id);
      flash(now && now.hidden ? "Hidden on storefront" : "Unhidden on storefront");
      return;
    }
    if (act === "remove-item" || act === "remove-selected") {
      const rid = act === "remove-selected" ? state.draft.selectedId : id;
      state.draft.items = stripId(state.draft.items, rid);
      state.draft.selectedId = state.draft.items[0] ? state.draft.items[0].id : null;
      state.draft.checked = state.draft.checked.filter((x) => x !== rid);
      state.rowMenu = null;
      flash("Removed from menu");
      return;
    }
    if (act === "hide-selected") {
      const cur = findNode(state.draft.items, state.draft.selectedId);
      patchSelected({ hidden: !cur.hidden });
      flash(!cur.hidden ? "Hidden on storefront" : "Unhidden on storefront");
      return;
    }
    if (act === "bulk") {
      const kind = t.getAttribute("data-t");
      if (kind === "clear") state.draft.checked = [];
      if (kind === "hide") {
        const set = new Set(state.draft.checked);
        state.draft.items = mapTree(state.draft.items, (n) => (set.has(n.id) ? { ...n, hidden: true } : n));
        state.draft.checked = [];
        flash("Hidden on storefront");
        return;
      }
      if (kind === "remove") {
        const drop = new Set(state.draft.checked);
        const strip = (nodes) => nodes.filter((n) => !drop.has(n.id)).map((n) => ({ ...n, children: strip(n.children || []) }));
        state.draft.items = strip(state.draft.items);
        state.draft.checked = [];
        state.draft.selectedId = state.draft.items[0] ? state.draft.items[0].id : null;
        flash("Removed from menu");
        return;
      }
      render(); return;
    }
    if (act === "toggle-type") { state.typeOpen = !state.typeOpen; state.sortOpen = false; render(); return; }
    if (act === "set-type") {
      switchResourceType(t.getAttribute("data-t"));
      return;
    }
    if (act === "open-picker") {
      const sel = findNode(state.draft.items, state.draft.selectedId);
      const pending = state.pickerByType[sel.resourceType];
      state.picker = pending && pending.selected
        ? { kind: sel.resourceType, selected: pending.selected, include: pending.include || {}, expanded: pending.expanded || {}, query: pending.query || "" }
        : { kind: sel.resourceType, selected: sel.linkedIds || [], include: {}, expanded: {}, query: "" };
      render(); return;
    }
    if (act === "pick-check") {
      const on = state.picker.selected.includes(id);
      const next = new Set(state.picker.selected);
      const node = catalogFind(state.picker.kind, id);
      if (on) {
        next.delete(id);
        walk((node && node.children) || [], (n) => next.delete(n.id));
      } else {
        next.add(id);
        const parents = catalogAncestors(state.picker.kind, id);
        parents.forEach((x) => next.add(x));
        const exp = Object.assign({}, state.picker.expanded);
        parents.forEach((x) => { exp[x] = true; });
        state.picker.expanded = exp;
      }
      state.picker.selected = [...next];
      render(); return;
    }
    if (act === "pick-exp") {
      const cur = !!state.picker.expanded[id];
      state.picker.expanded = { ...state.picker.expanded, [id]: !cur };
      render(); return;
    }
    if (act === "pick-inc") {
      const node = catalogFind(state.picker.kind, id);
      const kids = catalogDescendantIds(state.picker.kind, id);
      const next = new Set(state.picker.selected);
      next.add(id);
      const allOn = kids.length > 0 && kids.every((k) => next.has(k));
      const exp = Object.assign({}, state.picker.expanded);
      if (allOn) {
        kids.forEach((k) => next.delete(k));
        state.picker.include = Object.assign({}, state.picker.include, { [id]: false });
      } else {
        kids.forEach((k) => next.add(k));
        exp[id] = true;
        walk((node && node.children) || [], (n) => {
          if ((n.children || []).length) exp[n.id] = true;
        });
        state.picker.include = Object.assign({}, state.picker.include, { [id]: true });
      }
      state.picker.selected = [...next];
      state.picker.expanded = exp;
      flash(allOn ? "Children removed" : "Children included");
      return;
    }
    if (act === "expand-all") {
      const exp = {};
      walk(CATALOG[state.picker.kind] || [], (n) => { exp[n.id] = true; });
      state.picker.expanded = exp;
      render(); return;
    }
    if (act === "apply-picker") { tryApply(); return; }
    if (act === "apply-cap") {
      state.loading = true;
      render();
      const n = Number(t.getAttribute("data-n"));
      setTimeout(() => { state.loading = false; applyPicker(n); render(); }, 350);
      return;
    }
    if (act === "alert-cancel") { state.alert = null; render(); return; }
    if (act === "img-src") {
      patchSelected({ imageSource: t.getAttribute("data-t") });
      const now = findNode(state.draft.items, state.draft.selectedId);
      if (now) patchSelected({ savedTypes: rememberType(now) });
      render(); return;
    }
    if (act === "preview") { state.preview = true; render(); return; }
    if (act === "close-preview") { state.preview = false; render(); return; }
    if (act === "save") { saveMenu(); return; }
  }

  function onInput(e) {
    const t = e.target.closest("[data-act]");
    if (!t) return;
    const act = t.getAttribute("data-act");
    if (act === "menu-name") { state.draft.menuName = t.value; state.draft.nameError = false; return; }
    if (act === "patch-name") {
      patchSelected({ name: t.value || "New Page" });
      const now = findNode(state.draft.items, state.draft.selectedId);
      if (now) patchSelected({ savedTypes: rememberType(now) });
      return;
    }
    if (act === "patch-link") {
      patchSelected({ linkTo: t.value || "/" });
      const now = findNode(state.draft.items, state.draft.selectedId);
      if (now) patchSelected({ savedTypes: rememberType(now) });
      return;
    }
    if (act === "pick-query") { state.picker.query = t.value; render(); }
  }

  function onChange(e) {
    if (e.target.getAttribute("data-act") === "upload") {
      const f = e.target.files && e.target.files[0];
      if (f) { patchSelected({ customImage: URL.createObjectURL(f), imageSource: "Custom" }); render(); }
    }
  }

  document.getElementById("app").addEventListener("click", onClick);
  document.getElementById("app").addEventListener("mouseover", (e) => {
    const row = e.target.closest("[data-act=hover-row]");
    if (row && state.view === "listing") {
      const id = row.getAttribute("data-id");
      if (state.hoverId !== id) { state.hoverId = id; render(); }
    }
  });
  document.getElementById("app").addEventListener("input", onInput);
  document.getElementById("app").addEventListener("change", onChange);

  seedFlow(startFlow);
  render();
})();
