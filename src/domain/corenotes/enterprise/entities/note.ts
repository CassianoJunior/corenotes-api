import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface NoteProps {
  userId: UniqueEntityId
  title: string
  content: string
  color: string
  markedAsFavorite: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export class Note extends Entity<NoteProps> {
  get userId() {
    return this.props.userId
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get color() {
    return this.props.color
  }

  set color(color: string) {
    this.props.color = color
    this.touch()
  }

  get markedAsFavorite() {
    return this.props.markedAsFavorite
  }

  set markedAsFavorite(markedAsFavorite: boolean) {
    this.props.markedAsFavorite = markedAsFavorite
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<NoteProps, 'createdAt' | 'markedAsFavorite'>,
    id?: UniqueEntityId,
  ) {
    const note = new Note(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        markedAsFavorite: props.markedAsFavorite ?? false,
      },
      id,
    )

    return note
  }
}
