export async function list () {
  return [
    { 
      id: 1, name: "Aspek A", weight: 0.1, 
      subs: [
        {
          id: 43,
          name: "Sub 1",
          value: 5,
          weight: 0.6,
          core: true
        },
        {
          id: 44,
          name: "Sub 2",
          value: 5,
          weight: 0.4,
          core: true
        }
      ]
    },
    { 
      id: 2, name: "Aspek B", weight: 0.2,
      subs: [
        {
          id: 45,
          name: "Sub 1",
          value: 5,
          weight: 0.6,
          core: true
        },
        {
          id: 46,
          name: "Sub 2",
          value: 5,
          weight: 0.4,
          core: true
        }
      ]
     },
    { 
      id: 3, name: "Aspek C", weight: 0.4,
      subs: [
        {
          id: 47,
          name: "Sub 1",
          value: 5,
          weight: 0.6,
          core: true
        },
        {
          id: 48,
          name: "Sub 2",
          value: 5,
          weight: 0.4,
          core: true
        }
      ]
    },
    { 
      id: 4, name: "Aspek D", weight: 0.3,
      subs: [
        {
          name: "Sub 1",
          value: 5,
          weight: 0.6,
          core: true
        },
        {
          name: "Sub 2",
          value: 5,
          weight: 0.4,
          core: true
        }
      ]
    }
  ];
}

export async function findById (id) {
  return { 
    id: 4, name: "Aspek D", weight: 0.3,
    subs: [
      {
        id: 41,
        name: "Sub 1",
        value: 5,
        weight: 0.6,
        core: true
      },
      {
        id: 42,
        name: "Sub 2",
        value: 5,
        weight: 0.4,
        core: true
      }
    ]
  }
}

export async function findSubAspectById (id) {
  return {
    id: 42,
    name: "Sub 2",
    value: 5,
    weight: 0.4,
    core: true
  }
}