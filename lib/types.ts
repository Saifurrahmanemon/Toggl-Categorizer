export interface TimeEntry {
  id: string
  description: string
  start: string
  stop: string
  duration: number
  workspace_id: number
  project_id?: number
  tags?: string[]
}

export interface CategorizedTimeEntry extends TimeEntry {
  category: string
  aiConfidence?: number
}

export interface CategoryUpdateParams {
  entryId: string
  category: string
  previousCategory: string
}

