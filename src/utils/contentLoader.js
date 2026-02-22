// Import all clearing JSON files
const clearingModules = import.meta.glob('/src/data/realm-*/trail-*/clearing-*.json', { eager: true })

// Build a structured map of all content
const contentMap = {}

for (const [path, module] of Object.entries(clearingModules)) {
  const data = module.default || module
  const realmMatch = path.match(/realm-(\d+)/)
  const trailMatch = path.match(/trail-(\d+)/)
  if (realmMatch && trailMatch) {
    const realm = parseInt(realmMatch[1])
    const trail = parseInt(trailMatch[1])
    if (!contentMap[realm]) contentMap[realm] = {}
    if (!contentMap[realm][trail]) contentMap[realm][trail] = []
    contentMap[realm][trail].push(data)
  }
}

// Sort clearings within each trail by id
for (const realm of Object.values(contentMap)) {
  for (const trail of Object.keys(realm)) {
    realm[trail].sort((a, b) => a.id.localeCompare(b.id))
  }
}

export function getClearing(realm, trail, clearingIndex) {
  if (contentMap[realm] && contentMap[realm][trail]) {
    return contentMap[realm][trail][clearingIndex] || null
  }
  return null
}

export function getClearingCount(realm, trail) {
  if (contentMap[realm] && contentMap[realm][trail]) {
    return contentMap[realm][trail].length
  }
  return 0
}

export function getTrailCount(realm) {
  if (contentMap[realm]) {
    return Object.keys(contentMap[realm]).length
  }
  return 0
}

export function getAllClearingsForTrail(realm, trail) {
  if (contentMap[realm] && contentMap[realm][trail]) {
    return contentMap[realm][trail]
  }
  return []
}

export const REALM_INFO = [
  {
    id: 1,
    name: "The Forest Museum",
    description: "Help the forest creatures remember their names!",
    theme: "forest",
    trails: [
      { id: 1, name: "Creatures of the Forest" },
      { id: 2, name: "The Museum Map" },
      { id: 3, name: "What Happened Yesterday?" },
      { id: 4, name: "Who Likes What?" },
      { id: 5, name: "The Field Trip" },
    ]
  },
  {
    id: 2,
    name: "Totoro's Feast",
    description: "Help the spirits prepare the big celebration!",
    theme: "feast",
    trails: [
      { id: 1, name: "The Guest List" },
      { id: 2, name: "The Shopping Trip" },
      { id: 3, name: "What's Going to Happen?" },
      { id: 4, name: "Remember When?" },
      { id: 5, name: "The Celebration" },
    ]
  },
  {
    id: 3,
    name: "The Catbus City Tour",
    description: "Fix the city signs and schedules!",
    theme: "city",
    trails: [
      { id: 1, name: "Morning Routine" },
      { id: 2, name: "Around the City" },
      { id: 3, name: "Whose Is It?" },
      { id: 4, name: "What Happened on the Tour?" },
      { id: 5, name: "The Big Tour" },
    ]
  },
]

export default contentMap
