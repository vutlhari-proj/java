interface moduleDataConfig {
  data: string[] | number[];
}
export const moduleDataConfig = () : Record<string, moduleDataConfig> => ({
  nqf_levels: {
    data: [5, 6, 7, 8, 8, 9 , 10]
  },

  credits: {
    data: [2, 3, 10, 15, 20, 24, 30, 60, 180, 260]
  },

  module_types: {
    data: ['First Semester', 'Second Semester', 'Block', 'Extended', 'Year']
  }
});