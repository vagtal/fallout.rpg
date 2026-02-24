export const defaultConfig = {
  dimensions: {
    headerHeight: 35
  },
  root: {
    type: 'row',
    content: [
      {
        type: 'stack',
        content: [    
          {
            title: 'Player',
            type: 'component',
            componentType: 'Player',
            componentState: { text: 'Player C' }
          },      
          {
            title: 'PDF',
            type: 'component',
            componentType: 'PDF',
            componentState: { text: 'PDF C' }
          },
          {
            title: 'Drive',
            type: 'component',
            componentType: 'Drive',
            componentState: { text: 'Drive C' }
          }
        ]
      },
      {
        type: 'stack',
        content: [
          {
            title: 'Tracker',
            type: 'component',
            componentType: 'Tracker',
            componentState: { text: 'Tracker C' }
          },
          {
            title: 'RollForFantasy',
            type: 'component',
            componentType: 'RollForFantasy',
            componentState: { text: 'RollForFantasy C' }
          },
          {
            title: 'RabdRoll',
            type: 'component',
            componentType: 'RabdRoll',
            componentState: { text: 'RabdRoll C' }
          },
          {
            title: 'Sound',
            type: 'component',
            componentType: 'Sound',
            componentState: { text: 'Sound C' }
          }
        ]
      }
    ]
  }
}