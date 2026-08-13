/**
 * Menu editor v2 — post-call decisions (Rebecca / Samriti / Ani)
 * Separate from Phase 1 (03-menu-editor.html). Does not replace it.
 *
 * Combines:
 * - Navigation menu builder Phase 1 layout (tree left · inspector right)
 * - Commerce Storefront patterns (global sort, display limit 9/N, hide visibility)
 *   https://www.figma.com/design/RwUZjXlnzgSzCWWIt5qD8H/Commerce-Storefront?node-id=10559-76021
 */

(function (global) {
  var KEY = "navMenuBuilderV2_v1";
  var MAX_DEPTH = 3;
  var DISPLAY_CAP = 9;
  var STOREFRONT_LIMIT = 50;
  var CHILD_ALERT_THRESHOLD = 20;

  var RESOURCE_TYPES = [
    { id: "custom", label: "Custom URL", default: true },
    { id: "collection", label: "Collection" },
    { id: "category", label: "Category" },
    { id: "page", label: "Pages" },
    { id: "blog", label: "Blog" },
    { id: "policy", label: "Policy" },
    { id: "orders", label: "Orders" },
    { id: "profile", label: "Profile settings" }
  ];

  var SORT_OPTIONS = [
    { id: "manual", label: "Manual (drag)" },
    { id: "az", label: "A → Z" },
    { id: "za", label: "Z → A" },
    { id: "new-old", label: "New → Old" },
    { id: "old-new", label: "Old → New" }
  ];

  /* Expanded catalog — brands under Outdoor to demo 9-cap + large-child alert */
  var BRANDS = [
    "Craftsman", "Mac Tools", "Snap-on", "Makita", "DeWalt", "Milwaukee",
    "Bosch", "Hilti", "Festool", "Ryobi", "Ridgid", "Metabo", "Hitachi",
    "Panasonic", "Ingersoll Rand", "Chicago Pneumatic", "Atlas Copco",
    "Stanley", "Black+Decker", "Worx", "Ego", "Greenworks", "Husqvarna",
    "Stihl", "Echo", "Honda Power", "Kohler", "Briggs", "Generac", "Cat"
  ];

  var CATALOG = [
    { id: "outdoor", name: "Outdoor", type: "collection", parent: null, created: 2020 },
    { id: "outdoor-sofa", name: "Outdoor Sofa", type: "collection", parent: "outdoor", created: 2022 },
    { id: "outdoor-table", name: "Outdoor Table", type: "collection", parent: "outdoor", created: 2021 },
    { id: "umbrellas", name: "Umbrellas", type: "collection", parent: "outdoor", created: 2023 },
    { id: "furniture", name: "Furniture", type: "collection", parent: null, created: 2019 },
    { id: "sofas", name: "Sofas", type: "collection", parent: "furniture", created: 2021 },
    { id: "sectional", name: "Sectional sofas", type: "collection", parent: "sofas", created: 2024 },
    { id: "loveseats", name: "Loveseats", type: "collection", parent: "sofas", created: 2023 },
    { id: "tables", name: "Tables", type: "collection", parent: "furniture", created: 2020 },
    { id: "dining-tables", name: "Dining tables", type: "collection", parent: "tables", created: 2022 },
    { id: "coffee-tables", name: "Coffee tables", type: "collection", parent: "tables", created: 2021 },
    { id: "sale", name: "Sale", type: "collection", parent: null, created: 2024 },
    { id: "sale-clearance", name: "Clearance", type: "collection", parent: "sale", created: 2024 },
    { id: "sale-last-chance", name: "Last chance", type: "collection", parent: "sale-clearance", created: 2025 },
    { id: "living", name: "Living", type: "category", parent: null, created: 2018 },
    { id: "living-sofas", name: "Sofas & lounges", type: "category", parent: "living", created: 2020 },
    { id: "living-sectionals", name: "Sectionals", type: "category", parent: "living-sofas", created: 2021 },
    { id: "bedroom", name: "Bedroom", type: "category", parent: null, created: 2018 },
    { id: "bedroom-beds", name: "Beds", type: "category", parent: "bedroom", created: 2019 },
    { id: "bedroom-king", name: "King beds", type: "category", parent: "bedroom-beds", created: 2020 },
    { id: "about", name: "About us", type: "page", parent: null, created: 2017 },
    { id: "contact", name: "Contact", type: "page", parent: null, created: 2017 },
    { id: "shipping", name: "Shipping & delivery", type: "page", parent: null, created: 2019 },
    { id: "faqs", name: "FAQs", type: "page", parent: null, created: 2020 },
    { id: "blog-home", name: "Blog home", type: "blog", parent: null, created: 2018 },
    { id: "blog-guides", name: "Buying guides", type: "blog", parent: "blog-home", created: 2022 },
    { id: "privacy", name: "Privacy policy", type: "policy", parent: null, created: 2016 },
    { id: "terms", name: "Terms of service", type: "policy", parent: null, created: 2016 },
    { id: "returns-policy", name: "Returns policy", type: "policy", parent: null, created: 2019 },
    { id: "orders-hub", name: "Order history", type: "orders", parent: null, created: 2021 },
    { id: "track-order", name: "Track order", type: "orders", parent: "orders-hub", created: 2022 },
    { id: "profile-account", name: "My account", type: "profile", parent: null, created: 2021 },
    { id: "profile-addresses", name: "Addresses", type: "profile", parent: "profile-account", created: 2021 }
  ];

  BRANDS.forEach(function (name, i) {
    CATALOG.push({
      id: "brand-" + (i + 1),
      name: name,
      type: "collection",
      parent: "outdoor",
      created: 2015 + (i % 10)
    });
  });

  function byId(id) {
    for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) return CATALOG[i];
    return null;
  }

  function childrenOf(parentId, type) {
    return CATALOG.filter(function (c) {
      return c.parent === parentId && (!type || c.type === type);
    });
  }

  function rootsOf(type) {
    return CATALOG.filter(function (c) {
      return !c.parent && c.type === type;
    });
  }

  function pathOf(id) {
    var parts = [];
    var cur = byId(id);
    var guard = 0;
    while (cur && guard < 8) {
      parts.unshift(cur);
      cur = cur.parent ? byId(cur.parent) : null;
      guard++;
    }
    return parts;
  }

  function sortNodes(nodes, sortId) {
    if (!sortId || sortId === "manual") return nodes.slice();
    var list = nodes.slice();
    if (sortId === "za") {
      list.sort(function (a, b) { return b.name.localeCompare(a.name); });
    } else if (sortId === "new-old") {
      list.sort(function (a, b) { return (b.created || 0) - (a.created || 0); });
    } else if (sortId === "old-new") {
      list.sort(function (a, b) { return (a.created || 0) - (b.created || 0); });
    } else {
      list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }
    return list;
  }

  function resourcePath(cat) {
    if (!cat) return "/";
    if (cat.type === "custom") return cat.link || "/";
    var map = {
      collection: "/collections/",
      category: "/categories/",
      page: "/pages/",
      blog: "/blog/",
      policy: "/policies/",
      orders: "/account/orders/",
      profile: "/account/"
    };
    return (map[cat.type] || "/") + cat.id;
  }

  function uid(prefix) {
    return (prefix || "mi") + "-" + Math.random().toString(36).slice(2, 9);
  }

  function emptyState() {
    return {
      menuName: "Main menu",
      globalSort: "manual",
      displayCap: DISPLAY_CAP,
      storefrontLimit: STOREFRONT_LIMIT,
      maxDepth: MAX_DEPTH,
      items: [],
      selectedId: null,
      checked: {},
      dirty: true
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    var s = emptyState();
    /* Seed Outdoor parent so drill-down / child alert is demoable */
    var outdoor = byId("outdoor");
    var id = uid("mi");
    s.items = [{
      id: id,
      label: outdoor.name,
      resourceType: "collection",
      resourceId: outdoor.id,
      link: resourcePath(outdoor),
      depth: 1,
      parentId: null,
      imageMode: "collection",
      hidden: false,
      includeChildren: false,
      childIds: [],
      status: "ok"
    }];
    s.selectedId = id;
    return s;
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function reset() {
    localStorage.removeItem(KEY);
    return load();
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.innerHTML = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove("show");
    }, 2600);
  }

  function descendantCount(resourceId) {
    var n = 0;
    function walk(pid) {
      childrenOf(pid).forEach(function (c) {
        n++;
        walk(c.id);
      });
    }
    walk(resourceId);
    return n;
  }

  global.NavV2 = {
    KEY: KEY,
    MAX_DEPTH: MAX_DEPTH,
    DISPLAY_CAP: DISPLAY_CAP,
    STOREFRONT_LIMIT: STOREFRONT_LIMIT,
    CHILD_ALERT_THRESHOLD: CHILD_ALERT_THRESHOLD,
    RESOURCE_TYPES: RESOURCE_TYPES,
    SORT_OPTIONS: SORT_OPTIONS,
    CATALOG: CATALOG,
    byId: byId,
    childrenOf: childrenOf,
    rootsOf: rootsOf,
    pathOf: pathOf,
    sortNodes: sortNodes,
    resourcePath: resourcePath,
    uid: uid,
    load: load,
    save: save,
    reset: reset,
    toast: toast,
    descendantCount: descendantCount
  };
})(window);
