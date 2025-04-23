# D&D 2024 Statblocks for Obsidian

This plugin renders Dungeons & Dragons 2024 (OneD&D) style monster statblocks in Obsidian, using Homebrewery-compatible syntax.

## Features

- Supports Homebrewry style inside the monster and monsterwide (for wider statblocks) code block.
- Includes stat tables, traits, actions, and reactions styling


## Installation

### Manual Installation

1. Download from the link. 
2. Extract the zip file to your Obsidian vault's `.obsidian/plugins/` directory
   - The path should look like: `.obsidian/plugins/dnd-2024-statblock/`
3. Make sure the following files are in the plugin directory:
   - `main.js`
   - `styles.css`
   - `manifest.json`
   - `fonts/` directory with the required fonts
4. Enable the plugin in Obsidian's "Community Plugins" settings

## Usage

### Code Block Syntax

Use a code block with the `monster` language:


```monster
{{monster,frame,wide
## Sphinx of Wonder
*Tiny Celestial, Lawful Good*

{{stats

{{vitals
**AC**         :: 13
**HP**         :: 24 (7d4 + 7)
**Speed**      :: 20ft., Fly 40ft
\column
**Initiative** :: +3 (13)
}}

{{tables
|   |   |  MOD | SAVE |
|:--|:-:|:----:|:----:|
|Str| 6 | --2  | --2  |
|Int| 15|  +2  |  +2  |

|   |   |  MOD | SAVE |
|:--|:-:|:----:|:----:|
|Dex| 17|  +3  |  +3  |
|Wis| 12|  +1  |  +1  |

|   |   |  MOD | SAVE |
|:--|:-:|:----:|:----:|
|Con| 13|  +1  |  +1  |
|Cha| 11|  +0  |  +0  |
}}

**Skills**      :: Arcana +4, Religion +4, Stealth +5
**Resistances** :: Necrotic, Psychic, Radiant
**Senses**      :: Darkvision 60 ft., Passive Perception 11
**Languages**   :: Celestial, Common
**CR**          :: 1 (XP 200; PB +2)
}}

### Traits
***Magic Resistance.*** The sphinx has Advantage on saving throws against spells and other magical effects.
:
### Actions
***Rend.*** *Melee Attack Roll:* +5, reach 5ft. *Hit* 5 (1d4 + 3) Slashing damage plus 7 (2d6) Radiant damage.
:
### Reactions
***Burst of Ingenuity (2/Day).*** *Trigger:* The sphinx or another creature within 30 feet makes an ability check or a saving throw. *Response:* The sphinx adds 2 to the roll.
}}
```

## Customization

The plugin uses a styles.css file that can be modified to fit your preferences. You can adjust colors, fonts, and other styling properties in this file.

## Artesenal Monster Database
This git includes monsters from the open Artesenal Monster Database. Unzip the folder and add the folder and it's contents to your Obisdian vault. They are all formatted to work with the plugin. 
see license.txt for licenses on the monsters. 

## Requirements

- Obsidian v0.15.0 or higher
- Fonts used:
  - Scaly Sans Caps (for titles)
  - Scaly Sans (various) (for body text)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Credits

- Inspired by the official D&D 2024 statblock design
- Font styling based on Homebrewery's statblock implementation

---

For bug reports or feature requests, please open an issue on the [GitHub repository](https://github.com/yourusername/dnd-2024-statblock).
