import * as React from 'react'

import {useSelect} from '../../src'
import {colors, containerStyles, menuStyles} from '../utils'

const relationshipType = [
  {
    value: 'Parent',
    label: 'Parent',
  },
  {
    value: 'Sibling',
    label: 'Sibling',
  },
  {
    value: 'Child',
    label: 'Child',
  },
]

const itemToString = item => item?.value ?? ''

export default function DropdownSelect() {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: relationshipType,
    itemToString,
    stateReducer: (state, { changes, type }) => {
      console.log(state, changes, type);
      return changes;
    }
  })

  const [reference, setReference] = React.useState(null)

  return (
    <div style={containerStyles}>
      <label
        style={{
          fontWeight: 'bolder',
          color: selectedItem ? selectedItem : 'black',
        }}
        {...getLabelProps()}
      >
        Choose an element:
      </label>
      <div
        style={{
          padding: '4px',
          textAlign: 'center',
          border: '1px solid black',
          backgroundColor: 'lightgray',
          cursor: 'pointer',
        }}
        {...getToggleButtonProps({ref: setReference})}
      >
        {selectedItem ? selectedItem.value : 'Elements'}
        {isOpen ? <>&#8593;</> : <>&#8595;</>}
      </div>
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen
          ? relationshipType.map((item, index) => (
              <li
                style={{
                  padding: '4px',
                  backgroundColor:
                    highlightedIndex === index ? '#bde4ff' : null,
                }}
                key={`${item.value}${index}`}
                {...getItemProps({
                  item,
                  index,
                  'data-testid': `downshift-item-${index}`,
                })}
              >
                {item.value}
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}
