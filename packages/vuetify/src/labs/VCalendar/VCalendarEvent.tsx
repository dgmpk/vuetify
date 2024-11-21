// Components
import { VBadge } from '@/components/VBadge'
import { VChip } from '@/components/VChip'

// Utilities
import { genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'
import { withModifiers } from 'vue'

export const makeVCalendarEventProps = propsFactory({
  allDay: Boolean,
  day: Object,
  event: Object,
}, 'VCalendarEvent')

export const VCalendarEvent = genericComponent()({
  name: 'VCalendarEvent',

  props: makeVCalendarEventProps(),

  emits: {
    'click:event': null,
    'contextmenu:event': null
  },

  setup (props, { attrs, emit, slots }) {
    useRender(() => (
      <VChip
        color={ props.allDay ? 'primary' : undefined }
        density="comfortable"
        label={ props.allDay }
        width="100%"
        { ...getPrefixedEventHandlers(attrs, ':event', () => ({
          allDay: props.allDay,
          day: props.day,
          event: props.event,
        }))}
        onClick={ () => emit('click:event', props.event) }
        onContextmenu={ withModifiers((event: any) => emit('contextmenu:event', event, props.day, props.event), ['stop']) }
      >
        <VBadge
          inline
          dot
          color={ props.event?.color }
        />

        { props.event?.title }
      </VChip>
    ))

    return {}
  },

})

export type VCalendarEvent = InstanceType<typeof VCalendarEvent>
