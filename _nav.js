(function (global) {
  var KEY = "navMenuBuilderProto";

  var CATALOG = [
    /* Collections */
    { id: "outdoor", name: "Outdoor", children: 3, type: "collection", inMenu: false },
    { id: "umbrellas", name: "Umbrellas", children: 0, type: "collection", parent: "outdoor", inMenu: false },
    { id: "ranges", name: "Ranges", children: 2, type: "collection", parent: "outdoor", inMenu: false },
    { id: "range-a", name: "Range A", children: 0, type: "collection", parent: "ranges", inMenu: false },
    { id: "range-b", name: "Range B", children: 0, type: "collection", parent: "ranges", inMenu: false },
    { id: "summer", name: "Summer", children: 0, type: "collection", inMenu: false },
    { id: "sale", name: "Sale", children: 0, type: "collection", inMenu: false, highlight: true },
    { id: "new-arrivals", name: "New Arrivals", children: 0, type: "collection", inMenu: false },
    { id: "furniture", name: "Furniture", children: 5, type: "collection", inMenu: false },
    { id: "sofas", name: "Sofas", children: 2, type: "collection", parent: "furniture", inMenu: false },
    { id: "sectional", name: "Sectional sofas", children: 0, type: "collection", parent: "sofas", inMenu: false },

    /* Categories — browse taxonomy */
    { id: "living", name: "Living", children: 2, type: "category", inMenu: false },
    { id: "living-sofas", name: "Sofas & lounges", children: 0, type: "category", parent: "living", inMenu: false },
    { id: "living-tables", name: "Coffee & side tables", children: 0, type: "category", parent: "living", inMenu: false },
    { id: "bedroom", name: "Bedroom", children: 2, type: "category", inMenu: false },
    { id: "beds", name: "Beds", children: 1, type: "category", parent: "bedroom", inMenu: false },
    { id: "bed-frames", name: "Bed frames", children: 0, type: "category", parent: "beds", inMenu: false },
    { id: "bedding", name: "Bedding", children: 0, type: "category", parent: "bedroom", inMenu: false },
    { id: "dining", name: "Dining", children: 2, type: "category", inMenu: false },
    { id: "dining-tables", name: "Dining tables", children: 0, type: "category", parent: "dining", inMenu: false },
    { id: "dining-chairs", name: "Dining chairs", children: 0, type: "category", parent: "dining", inMenu: false },
    { id: "kitchen", name: "Kitchen", children: 0, type: "category", inMenu: false },
    { id: "bathroom", name: "Bathroom", children: 0, type: "category", inMenu: false },
    { id: "garden", name: "Garden", children: 2, type: "category", inMenu: false },
    { id: "garden-furniture", name: "Garden furniture", children: 0, type: "category", parent: "garden", inMenu: false },
    { id: "planters", name: "Planters & pots", children: 0, type: "category", parent: "garden", inMenu: false },
    { id: "lighting", name: "Lighting", children: 2, type: "category", inMenu: false },
    { id: "ceiling-lights", name: "Ceiling lights", children: 0, type: "category", parent: "lighting", inMenu: false },
    { id: "lamps", name: "Lamps", children: 0, type: "category", parent: "lighting", inMenu: false },
    { id: "decor", name: "Home décor", children: 0, type: "category", inMenu: false },
    { id: "storage", name: "Storage & organisation", children: 0, type: "category", inMenu: false },
    { id: "kids", name: "Kids & baby", children: 0, type: "category", inMenu: false },
    { id: "rugs", name: "Rugs & mats", children: 0, type: "category", inMenu: false },
    { id: "clearance", name: "Clearance", children: 0, type: "category", inMenu: false },

    /* Pages — CMS / content */
    { id: "about", name: "About us", children: 0, type: "page", inMenu: false },
    { id: "contact", name: "Contact", children: 0, type: "page", inMenu: false },
    { id: "shipping", name: "Shipping & delivery", children: 0, type: "page", inMenu: false },
    { id: "returns", name: "Returns & refunds", children: 0, type: "page", inMenu: false },
    { id: "privacy", name: "Privacy policy", children: 0, type: "page", inMenu: false },
    { id: "terms", name: "Terms of service", children: 0, type: "page", inMenu: false },
    { id: "faqs", name: "FAQs", children: 0, type: "page", inMenu: false },
    { id: "store-locator", name: "Store locator", children: 0, type: "page", inMenu: false },
    { id: "careers", name: "Careers", children: 0, type: "page", inMenu: false },
    { id: "gift-cards", name: "Gift cards", children: 0, type: "page", inMenu: false },
    { id: "size-guide", name: "Size guide", children: 0, type: "page", inMenu: false },
    { id: "track-order", name: "Track your order", children: 0, type: "page", inMenu: false },
    { id: "trade", name: "Trade & commercial", children: 0, type: "page", inMenu: false },
    { id: "sustainability", name: "Sustainability", children: 0, type: "page", inMenu: false }
  ];

  var CHILD_MAP = {
    outdoor: ["umbrellas", "ranges"],
    ranges: ["range-a", "range-b"],
    furniture: ["sofas"],
    sofas: ["sectional"],
    summer: [],
    living: ["living-sofas", "living-tables"],
    bedroom: ["beds", "bedding"],
    beds: ["bed-frames"],
    dining: ["dining-tables", "dining-chairs"],
    garden: ["garden-furniture", "planters"],
    lighting: ["ceiling-lights", "lamps"]
  };

  function resourcePath(cat) {
    if (!cat) return "/";
    if (cat.type === "category") return "/categories/" + cat.id;
    if (cat.type === "page") return "/pages/" + cat.id;
    if (cat.type === "collection") return "/collections/" + cat.id;
    return "/" + cat.type + "s/" + cat.id;
  }

  /* ─── Menus library (list) + editor draft ─── */
  var STORE_KEY = "navMenuBuilderStore_v2";
  var DRAFT_KEY = "navMenuBuilderDraft_v2";

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function emptyDraft(opts) {
    opts = opts || {};
    return {
      id: opts.id || null,
      isNew: opts.isNew !== false && !opts.id,
      menuName: opts.menuName || "Untitled menu",
      active: opts.active !== false,
      items: opts.items ? clone(opts.items) : [],
      selectedId: opts.selectedId || null,
      dirty: !!opts.dirty,
      journey: opts.journey || null
    };
  }

  function menuRecord(partial) {
    return {
      id: partial.id || uid("menu"),
      name: partial.name || "Untitled menu",
      active: partial.active !== false,
      items: partial.items ? clone(partial.items) : [],
      updatedAt: partial.updatedAt || new Date().toISOString()
    };
  }

  function defaultMenus() {
    var mainItems = buildFromSelection(["outdoor", "sale", "new-arrivals", "furniture"], true);
    mainItems.forEach(function (it) {
      if (it.resourceId === "outdoor") it.imageMode = "custom";
      if (it.resourceId === "sale") it.status = "ok";
    });
    var footerItems = buildFromSelection(["about", "contact", "returns"], false);
    return [
      menuRecord({
        id: "menu-main",
        name: "Main menu",
        active: true,
        items: mainItems
      }),
      menuRecord({
        id: "menu-footer",
        name: "Footer",
        active: true,
        items: footerItems
      })
    ];
  }

  function loadStore() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) {
        var seeded = { menus: defaultMenus(), version: 2 };
        localStorage.setItem(STORE_KEY, JSON.stringify(seeded));
        return seeded;
      }
      var data = JSON.parse(raw);
      if (!data.menus || !data.menus.length) {
        data.menus = defaultMenus();
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
      }
      return data;
    } catch (e) {
      return { menus: defaultMenus(), version: 2 };
    }
  }

  function saveStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  function listMenus() {
    return loadStore().menus.slice();
  }

  function getMenu(id) {
    return loadStore().menus.find(function (m) {
      return m.id === id;
    }) || null;
  }

  function deleteMenu(id) {
    var store = loadStore();
    store.menus = store.menus.filter(function (m) {
      return m.id !== id;
    });
    saveStore(store);
    var draft = loadDraft();
    if (draft && draft.id === id) clearDraft();
    return store.menus;
  }

  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      return Object.assign(emptyDraft({ isNew: false }), JSON.parse(raw));
    } catch (e) {
      return null;
    }
  }

  function saveDraft(draft) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
  }

  /** Open existing menu into editor draft */
  function openMenu(id) {
    var menu = getMenu(id);
    if (!menu) return null;
    var draft = emptyDraft({
      id: menu.id,
      isNew: false,
      menuName: menu.name,
      active: menu.active,
      items: menu.items,
      selectedId: menu.items[0] ? menu.items[0].id : null,
      dirty: false
    });
    saveDraft(draft);
    return draft;
  }

  /** Start a brand-new menu (not in list until Save) */
  function createNewMenu(opts) {
    opts = opts || {};
    var draft = emptyDraft({
      id: uid("menu"),
      isNew: true,
      menuName: opts.menuName || "Untitled menu",
      active: opts.active !== false,
      items: opts.items || [],
      selectedId: null,
      dirty: true,
      journey: opts.journey || null
    });
    saveDraft(draft);
    return draft;
  }

  /** Commit draft into menus list — this is what Save does */
  function commitMenu(draft) {
    if (!draft) return null;
    var store = loadStore();
    var record = menuRecord({
      id: draft.id || uid("menu"),
      name: (draft.menuName || "").trim() || "Untitled menu",
      active: !!draft.active,
      items: draft.items || [],
      updatedAt: new Date().toISOString()
    });
    var idx = store.menus.findIndex(function (m) {
      return m.id === record.id;
    });
    if (idx >= 0) store.menus[idx] = record;
    else store.menus.unshift(record);
    saveStore(store);
    draft.id = record.id;
    draft.isNew = false;
    draft.dirty = false;
    draft.menuName = record.name;
    saveDraft(draft);
    return record;
  }

  function menuStats(menu) {
    var items = (menu && menu.items) || [];
    var roots = items.filter(function (i) {
      return !i.parentId;
    });
    var maxDepth = 1;
    items.forEach(function (i) {
      maxDepth = Math.max(maxDepth, i.depth || 1);
    });
    function nestCount(rootId) {
      var n = 0;
      function walk(pid) {
        items.forEach(function (it) {
          if (it.parentId === pid) {
            n++;
            walk(it.id);
          }
        });
      }
      walk(rootId);
      return n;
    }
    return {
      total: items.length,
      topLevel: roots.length,
      maxDepth: items.length ? maxDepth : 0,
      roots: roots.map(function (r) {
        return { id: r.id, label: r.label, nestCount: nestCount(r.id) };
      })
    };
  }

  function resetLibrary() {
    var store = { menus: defaultMenus(), version: 2 };
    saveStore(store);
    clearDraft();
    return store;
  }

  /* Legacy editor helpers (map onto draft) */
  function defaultState() {
    return emptyDraft({ menuName: "Main menu", isNew: true, dirty: true });
  }

  function load() {
    return loadDraft() || openMenu("menu-main") || createNewMenu();
  }

  function save(state) {
    saveDraft(state);
  }

  function reset() {
    clearDraft();
    return createNewMenu({ menuName: "Untitled menu" });
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
    }, 2400);
  }

  function uid(prefix) {
    return (prefix || "item") + "-" + Math.random().toString(36).slice(2, 9);
  }

  function catalogById(id) {
    for (var i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].id === id) return CATALOG[i];
    }
    return null;
  }

  /** 1-based depth of this node in the catalog tree */
  function catalogLevel(id) {
    var level = 1;
    var cur = catalogById(id);
    var guard = 0;
    while (cur && cur.parent && guard < 10) {
      level++;
      cur = catalogById(cur.parent);
      guard++;
    }
    return level;
  }

  /** Max additional levels below this node (0 = leaf) */
  function nestingDepthBelow(id) {
    var kids = CHILD_MAP[id] || [];
    if (!kids.length) return 0;
    var max = 0;
    kids.forEach(function (kidId) {
      max = Math.max(max, 1 + nestingDepthBelow(kidId));
    });
    return max;
  }

  /** Levels that would appear in the menu if include-children is on (capped at 3 total) */
  function nestPreview(id) {
    var level = catalogLevel(id);
    var below = nestingDepthBelow(id);
    var totalIfNested = Math.min(3, level + below);
    var levelsAdded = Math.max(0, totalIfNested - level);
    var truncated = level + below > 3;
    return {
      level: level,
      below: below,
      levelsAdded: levelsAdded,
      truncated: truncated,
      childCount: (CHILD_MAP[id] || []).length
    };
  }

  /** Build tree items from selected top-level catalog IDs */
  function buildFromSelection(ids, includeChildren) {
    var items = [];
    var depthOf = {};

    function addNode(catId, depth, parentMenuId) {
      if (depth > 3) return;
      var cat = catalogById(catId);
      if (!cat) return;
      var id = uid("mi");
      depthOf[id] = depth;
      items.push({
        id: id,
        label: cat.name,
        resourceId: cat.id,
        resourceType: cat.type,
        depth: depth,
        parentId: parentMenuId || null,
        imageMode: cat.type === "collection" ? "collection" : "none",
        status: cat.id === "ranges" ? "empty" : "ok",
        link: resourcePath(cat)
      });
      if (includeChildren && CHILD_MAP[catId]) {
        CHILD_MAP[catId].forEach(function (childId) {
          addNode(childId, depth + 1, id);
        });
      }
      return id;
    }

    ids.forEach(function (id) {
      var cat = catalogById(id);
      if (!cat || cat.parent) return;
      addNode(id, 1, null);
    });

    ids.forEach(function (id) {
      var already = items.some(function (it) {
        return it.resourceId === id;
      });
      if (!already) {
        var cat = catalogById(id);
        if (cat) addNode(id, 1, null);
      }
    });

    return items;
  }

  function addChildrenForItem(state, itemId) {
    var parent = state.items.find(function (i) {
      return i.id === itemId;
    });
    if (!parent || !parent.resourceId) return state;
    var kids = CHILD_MAP[parent.resourceId] || [];
    if (!kids.length) {
      toast("No child collections for this item");
      return state;
    }
    var existing = {};
    state.items.forEach(function (i) {
      if (i.parentId === itemId) existing[i.resourceId] = true;
    });
    var nextDepth = Math.min((parent.depth || 1) + 1, 3);
    if (parent.depth >= 3) {
      toast("Max depth is 3 levels");
      return state;
    }
    var added = 0;
    kids.forEach(function (kidId) {
      if (existing[kidId]) return;
      var cat = catalogById(kidId);
      if (!cat) return;
      state.items.push({
        id: uid("mi"),
        label: cat.name,
        resourceId: cat.id,
        resourceType: cat.type,
        depth: nextDepth,
        parentId: itemId,
        imageMode: cat.type === "collection" ? "collection" : "none",
        status: cat.id === "ranges" ? "empty" : "ok",
        link: resourcePath(cat)
      });
      if (nextDepth < 3 && CHILD_MAP[kidId]) {
        var mid = state.items[state.items.length - 1];
        CHILD_MAP[kidId].forEach(function (gId) {
          var g = catalogById(gId);
          if (!g) return;
          state.items.push({
            id: uid("mi"),
            label: g.name,
            resourceId: g.id,
            resourceType: g.type,
            depth: nextDepth + 1,
            parentId: mid.id,
            imageMode: g.type === "collection" ? "collection" : "none",
            status: "ok",
            link: resourcePath(g)
          });
        });
      }
      added++;
    });
    toast(added ? "Added " + added + " child collection(s)" : "Children already in menu");
    return state;
  }

  function seedComplexMenu() {
    var draft = openMenu("menu-main");
    if (!draft) {
      var store = loadStore();
      var main = defaultMenus()[0];
      store.menus = [main].concat(
        store.menus.filter(function (m) {
          return m.id !== "menu-main";
        })
      );
      saveStore(store);
      draft = openMenu("menu-main");
    }
    return draft;
  }

  /**
   * Figma clickable scenarios (► Menu builder page).
   * Keys match hub deep-links: ?figma=<key>
   */
  function seedFigmaScenario(key) {
    var draft;
    var focusId = null;

    if (key === "complex") {
      draft = seedComplexMenu();
      if (draft && draft.items[0]) focusId = draft.items[0].id;
      return { draft: draft, focusId: focusId, openDrawer: false };
    }

    if (key === "add-new" || key === "create") {
      draft = createNewMenu({ menuName: "Untitled menu", journey: "figma" });
      return { draft: draft, focusId: null, openDrawer: true };
    }

    if (key === "image-source") {
      draft = createNewMenu({ menuName: "Image source demo", journey: "figma" });
      draft.items = buildFromSelection(["contact", "outdoor"], false);
      // Prefer a page-like item that shows collection image mode like Figma
      var contact = draft.items.find(function (i) {
        return i.resourceId === "contact" || /contact/i.test(i.label);
      });
      var outdoor = draft.items.find(function (i) {
        return i.resourceId === "outdoor";
      });
      if (outdoor) {
        outdoor.imageMode = "collection";
        outdoor.label = outdoor.label || "Outdoor";
      }
      if (contact) {
        contact.label = "Contact us";
        contact.imageMode = "collection";
        contact.resourceType = "page";
        focusId = contact.id;
      } else if (outdoor) {
        focusId = outdoor.id;
      }
      draft.selectedId = focusId;
      draft.dirty = true;
      saveDraft(draft);
      return { draft: draft, focusId: focusId, openDrawer: false };
    }

    if (key === "resource-collection") {
      draft = createNewMenu({ menuName: "Resource · Collection", journey: "figma" });
      draft.items = buildFromSelection(["outdoor"], true);
      focusId = draft.items[0] ? draft.items[0].id : null;
      if (focusId) {
        draft.items[0].imageMode = "collection";
        draft.selectedId = focusId;
      }
      draft.dirty = true;
      saveDraft(draft);
      return { draft: draft, focusId: focusId, openDrawer: false };
    }

    if (key === "resource-category") {
      draft = createNewMenu({ menuName: "Resource · Category", journey: "figma" });
      draft.items = buildFromSelection(["living"], true);
      focusId = draft.items[0] ? draft.items[0].id : null;
      if (focusId) {
        draft.items[0].resourceType = "category";
        draft.items[0].imageMode = "none";
        draft.selectedId = focusId;
      }
      draft.dirty = true;
      saveDraft(draft);
      return { draft: draft, focusId: focusId, openDrawer: false };
    }

    if (key === "resource-pages") {
      draft = createNewMenu({ menuName: "Resource · Pages", journey: "figma" });
      draft.items = buildFromSelection(["about", "contact", "shipping"], false);
      focusId = draft.items[0] ? draft.items[0].id : null;
      if (focusId) {
        draft.items[0].resourceType = "page";
        draft.items[0].imageMode = "none";
        draft.selectedId = focusId;
      }
      draft.dirty = true;
      saveDraft(draft);
      return { draft: draft, focusId: focusId, openDrawer: false };
    }

    if (key === "bulk-drawer") {
      draft = createNewMenu({ menuName: "Bulk add demo", journey: "figma" });
      return { draft: draft, focusId: null, openDrawer: true };
    }

    // Default: open main list editor
    draft = seedComplexMenu();
    return { draft: draft, focusId: draft && draft.items[0] ? draft.items[0].id : null, openDrawer: false };
  }

  /** Phase 2 — sample Da Vinci draft from catalog + preferences */
  function buildDaVinciDraft(prefs) {
    prefs = prefs || {};
    var style = prefs.style || "collection-led";
    var depth = prefs.depth === 2 ? 2 : 3;
    var includeChildren = depth >= 3;
    var ids;
    if (style === "brand-led") {
      ids = ["furniture", "outdoor", "sale", "new-arrivals"];
    } else if (style === "promotional") {
      ids = ["sale", "new-arrivals", "outdoor", "furniture"];
    } else if (style === "simple") {
      ids = ["outdoor", "furniture", "sale"];
      includeChildren = false;
    } else {
      ids = ["outdoor", "sale", "new-arrivals", "furniture"];
    }
    var items = buildFromSelection(ids, includeChildren && depth > 2);
    if (depth === 2) {
      items.forEach(function (it) {
        if (it.children) {
          it.children.forEach(function (c) {
            c.children = [];
          });
        }
      });
    }
    items.forEach(function (it) {
      it.aiDraft = true;
      if (it.resourceId === "outdoor") it.imageMode = "collection";
      if (it.resourceId === "sale") it.status = "ok";
      (it.children || []).forEach(function mark(c) {
        c.aiDraft = true;
        (c.children || []).forEach(mark);
      });
    });
    return items;
  }

  global.NavProto = {
    KEY: STORE_KEY,
    CATALOG: CATALOG,
    CHILD_MAP: CHILD_MAP,
    load: load,
    save: save,
    reset: reset,
    toast: toast,
    uid: uid,
    catalogById: catalogById,
    catalogLevel: catalogLevel,
    nestingDepthBelow: nestingDepthBelow,
    nestPreview: nestPreview,
    resourcePath: resourcePath,
    buildFromSelection: buildFromSelection,
    addChildrenForItem: addChildrenForItem,
    seedComplexMenu: seedComplexMenu,
    seedFigmaScenario: seedFigmaScenario,
    buildDaVinciDraft: buildDaVinciDraft,
    defaultState: defaultState,
    listMenus: listMenus,
    getMenu: getMenu,
    deleteMenu: deleteMenu,
    openMenu: openMenu,
    createNewMenu: createNewMenu,
    commitMenu: commitMenu,
    saveDraft: saveDraft,
    loadDraft: loadDraft,
    clearDraft: clearDraft,
    menuStats: menuStats,
    resetLibrary: resetLibrary,
    loadStore: loadStore
  };
})(window);
