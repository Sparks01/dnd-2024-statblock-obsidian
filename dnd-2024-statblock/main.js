/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => DnD2024StatblockPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DnD2024StatblockPlugin = class extends import_obsidian.Plugin {
  async onload() {
    console.log("Loading D&D 2024 Statblock Plugin");
    this.loadFonts();
    this.registerMarkdownCodeBlockProcessor("monster", this.processMonsterBlock.bind(this));
    this.registerMarkdownPostProcessor(this.processInlineMonsters.bind(this));
  }
  onunload() {
    console.log("Unloading D&D 2024 Statblock Plugin");
  }
  /**
   * Load fonts directly using FileSystem API and Data URLs
   */
  async loadFonts() {
    try {
      const fs = require("fs");
      const path = require("path");
      const pluginPath = this.app.vault.adapter.basePath + "/.obsidian/plugins/" + this.manifest.id;
      console.log("Attempting to load fonts from:", pluginPath + "/fonts/");
      const loadFont = (fontPath, fontType) => {
        try {
          const fontData = fs.readFileSync(path.join(pluginPath, "fonts", fontPath));
          const base64Font = fontData.toString("base64");
          return `data:font/${fontType};base64,${base64Font}`;
        } catch (error) {
          console.error(`Failed to load font ${fontPath}:`, error);
          return null;
        }
      };
      const scalySansRegular = loadFont("Scaly Sans.otf", "opentype");
      const scalySansBold = loadFont("Scaly Sans Bold.otf", "opentype");
      const scalySansItalic = loadFont("Scaly Sans Italic.otf", "opentype");
      const scalySansBoldItalic = loadFont("Scaly Sans Bold Italic.otf", "opentype");
      const mrsEaves = loadFont("MrsEavesSmallCapsSmallCaps.ttf", "truetype");
      const fontStyle = document.createElement("style");
      fontStyle.id = "dnd-2024-fonts";
      fontStyle.textContent = `
      @font-face {
        font-family: "MrsEavesSmallCapsSmallCaps";
        src: ${mrsEaves ? `url("${mrsEaves}") format("truetype")` : ""};
        font-display: swap;
      }
      
      @font-face {
        font-family: "ScalySans";
        src: ${scalySansRegular ? `url("${scalySansRegular}") format("opentype")` : ""};
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: "ScalySans";
        src: ${scalySansBold ? `url("${scalySansBold}") format("opentype")` : ""};
        font-weight: bold;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: "ScalySans";
        src: ${scalySansItalic ? `url("${scalySansItalic}") format("opentype")` : ""};
        font-weight: normal;
        font-style: italic;
        font-display: swap;
      }
      
      @font-face {
        font-family: "ScalySans";
        src: ${scalySansBoldItalic ? `url("${scalySansBoldItalic}") format("opentype")` : ""};
        font-weight: bold;
        font-style: italic;
        font-display: swap;
      }
    `;
      const existingStyle = document.getElementById("dnd-2024-fonts");
      if (existingStyle) {
        existingStyle.remove();
      }
      document.head.appendChild(fontStyle);
      console.log("D&D 2024 Statblock fonts loaded via data URLs");
    } catch (error) {
      console.error("Error loading fonts:", error);
      const fallbackStyle = document.createElement("style");
      fallbackStyle.id = "dnd-2024-fonts-fallback";
      fallbackStyle.textContent = `
      .monster-container {
        font-family: Georgia, "Times New Roman", serif !important;
      }
      
      .monster-title {
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif !important;
      }
    `;
      document.head.appendChild(fallbackStyle);
      console.log("Using fallback fonts due to error loading custom fonts");
    }
  }
  /**
   * Process a code block with the monster language
   */
  async processMonsterBlock(source, el) {
    try {
      console.log("Processing monster code block");
      const container = document.createElement("div");
      container.className = "monster-container";
      await this.renderMonsterContent(source, container);
      el.appendChild(container);
    } catch (error) {
      console.error("Error processing monster block:", error);
      el.createEl("div", { text: "Error processing monster statblock: " + error.message });
    }
  }
  /**
   * Process Homebrewery style inline monster blocks
   */
  async processInlineMonsters(el, ctx) {
    try {
      if (el.closest("pre"))
        return;
      const textNodes = this.getTextNodes(el);
      for (const node of textNodes) {
        const text = node.textContent || "";
        if (text.includes("{{monster,frame") || text.includes("{!monster,frame")) {
          const startIndex = text.indexOf("{{monster,frame");
          const endIndex = text.indexOf("}}", startIndex);
          if (startIndex >= 0 && endIndex > startIndex) {
            const monsterContent = text.substring(startIndex + "{{monster,frame".length, endIndex);
            const beforeText = document.createTextNode(text.substring(0, startIndex));
            const afterText = document.createTextNode(text.substring(endIndex + 2));
            const monsterContainer = document.createElement("div");
            monsterContainer.className = "monster-container";
            await this.renderMonsterContent(monsterContent, monsterContainer);
            const parent = node.parentNode;
            if (parent) {
              parent.insertBefore(beforeText, node);
              parent.insertBefore(monsterContainer, node);
              parent.insertBefore(afterText, node);
              parent.removeChild(node);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error processing inline monsters:", error);
    }
  }
  /**
   * Get all text nodes in an element
   */
  getTextNodes(el) {
    const textNodes = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    return textNodes;
  }
  // Add these changes to your renderMonsterContent method
  /**
   * Render monster content into a container
   */
  async renderMonsterContent(source, container) {
    const monster = document.createElement("div");
    monster.className = "monster";
    const lines = source.split("\n");
    let title = "Monster";
    let type = "";
    let currentLine = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith("##")) {
        title = lines[i].replace(/^##\s*/, "").trim();
        currentLine = i + 1;
        break;
      }
    }
    if (currentLine < lines.length && lines[currentLine].trim().startsWith("*")) {
      type = lines[currentLine].replace(/^\*|\*$/g, "").trim();
      currentLine++;
    }
    const titleEl = document.createElement("h2");
    titleEl.className = "monster-title";
    titleEl.textContent = title;
    monster.appendChild(titleEl);
    if (type) {
      const typeEl = document.createElement("p");
      typeEl.className = "monster-type";
      typeEl.textContent = type;
      monster.appendChild(typeEl);
    }
    const statsEl = document.createElement("div");
    statsEl.className = "monster-stats";
    monster.appendChild(statsEl);
    const leftStatsEl = document.createElement("div");
    leftStatsEl.className = "monster-left-stats";
    statsEl.appendChild(leftStatsEl);
    const rightStatsEl = document.createElement("div");
    rightStatsEl.className = "monster-right-stats";
    statsEl.appendChild(rightStatsEl);
    let hasAdditionalStats = false;
    let additionalStatsEl = null;
    let tablesContainer = null;
    let currentSection = "";
    let currentSectionTitle = "";
    let inStats = false;
    let inTables = false;
    let tableParts = [];
    const leftStats = ["AC", "HP", "Speed"];
    const rightStats = ["Initiative"];
    const additionalStats = ["Skills", "Resistances", "Senses", "Languages", "CR"];
    for (let i = currentLine; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("###")) {
        if (currentSectionTitle) {
          await this.addSectionToMonster(monster, currentSectionTitle, currentSection);
        }
        currentSectionTitle = line.replace(/^###\s*/, "").trim();
        currentSection = "";
      } else if (line === "{{tables" || line === "{!tables") {
        inTables = true;
        if (!tablesContainer) {
          tablesContainer = document.createElement("div");
          tablesContainer.className = "monster-tables";
          statsEl.appendChild(tablesContainer);
        }
      } else if ((line === "}}" || line === "}!") && inTables) {
        inTables = false;
        if (tableParts.length > 0 && tablesContainer) {
          this.processTableData(tableParts.join("\n"), tablesContainer);
          tableParts = [];
        }
      } else if (inTables) {
        tableParts.push(line);
      } else if (line.includes("::")) {
        const parts = line.split("::").map((part) => part.trim());
        if (parts.length === 2) {
          const statName = parts[0].replace(/\*\*/g, "").trim();
          const statValue = parts[1].trim();
          const statEl = document.createElement("div");
          statEl.className = "monster-stat-item";
          const statKey = statName.toLowerCase();
          if (statKey.includes("initiative")) {
            statEl.classList.add("stat-initiative");
          }
          const statLabel = document.createElement("strong");
          statLabel.textContent = statName + ":";
          statEl.appendChild(statLabel);
          statEl.appendChild(document.createTextNode(" " + statValue));
          if (leftStats.some((s) => statKey.includes(s.toLowerCase()))) {
            leftStatsEl.appendChild(statEl);
          } else if (rightStats.some((s) => statKey.includes(s.toLowerCase()))) {
            rightStatsEl.appendChild(statEl);
          } else {
            if (!additionalStatsEl) {
              additionalStatsEl = document.createElement("div");
              additionalStatsEl.className = "monster-additional-stats";
              monster.appendChild(additionalStatsEl);
              hasAdditionalStats = true;
            }
            additionalStatsEl.appendChild(statEl);
          }
        }
      } else if (currentSectionTitle && !line.startsWith("{{") && !line.startsWith("}}")) {
        currentSection += line + "\n";
      }
    }
    if (currentSectionTitle) {
      await this.addSectionToMonster(monster, currentSectionTitle, currentSection);
    }
    container.appendChild(monster);
  }
  /**
   * Add a section to the monster block
   */
  async addSectionToMonster(monster, title, content) {
    const sectionEl = document.createElement("div");
    sectionEl.className = "monster-section";
    const sectionTitleEl = document.createElement("h3");
    sectionTitleEl.className = "monster-section-title";
    sectionTitleEl.textContent = title;
    sectionEl.appendChild(sectionTitleEl);
    const sectionContentEl = document.createElement("div");
    await import_obsidian.MarkdownRenderer.renderMarkdown(
      content,
      sectionContentEl,
      "",
      this
    );
    sectionEl.appendChild(sectionContentEl);
    monster.appendChild(sectionEl);
  }
  /**
   * Process markdown table data into HTML tables
   */
  processTableData(tableContent, container) {
    try {
      const tables = tableContent.split("\n\n").filter((table) => table.trim());
      for (const tableText of tables) {
        const rows = tableText.split("\n").filter((row) => row.trim());
        const tableEl = document.createElement("table");
        tableEl.className = "monster-table";
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (i === 1 && row.includes(":-")) {
            continue;
          }
          const cells = row.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map((cell) => cell.trim());
          const rowEl = document.createElement("tr");
          if (i === 0) {
            for (const cell of cells) {
              const thEl = document.createElement("th");
              thEl.textContent = cell;
              rowEl.appendChild(thEl);
            }
          } else {
            for (const cell of cells) {
              const tdEl = document.createElement("td");
              tdEl.textContent = cell;
              rowEl.appendChild(tdEl);
            }
          }
          tableEl.appendChild(rowEl);
        }
        container.appendChild(tableEl);
      }
    } catch (error) {
      console.error("Error processing table data:", error);
      const errorEl = document.createElement("div");
      errorEl.textContent = "Error processing table: " + error.message;
      errorEl.style.color = "red";
      container.appendChild(errorEl);
    }
  }
};
