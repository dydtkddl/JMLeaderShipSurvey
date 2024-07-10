export const scoreGroup = {
  growthMindset: ['experiences', 'attribute_of_learning', 'resiliency', 'belief_in_telent', 'appearance', 'resp_behaviors', 'self_evaluation', 'habit_of_writting'],
  communicationAbility: ['listening', 'communication_envir', 'operating_through_communication', 'lead_under_policy'],
  humanResourcesManagement: ['human_resources_management', 'conflicts_management'],
  decisionMaking: ['data_collection', 'resonalble_decision_making', 'decision_ability'],
  problemSolvingAbility: ['problem_sol_ability'],
  leadershipHumanistic: ['vision', 'rolemodel', 'mannerism', 'compassion_for_others'],
  leadershipOrganizational: ['human_dev', 'organizational_management', 'project_management', 'administration', 'guiding_skill']
};

const scoreGroupUserMean = (responseData) =>{
  const data = Object.keys(scoreGroup).map( (group) => {

    const b =  mean(
    scoreGroup[group].map( (feature) => {
      const a = aggregate_by_string_subset(feature, responseData)
      return a
    }))
    return b
  })
  return data
}
const mean = (values) => {
    const validValues = values.filter(v => v !== undefined);
    return validValues.reduce((a, b) => a + b, 0) / validValues.length;
  };
  
  const mapResponseToScore = (response) => {
    switch (response) {
      case 'Strongly Agree':
        return 5;
      case 'Agree':
        return 4;
      case 'Neutral':
        return 3;
      case 'Disagree':
        return 2;
      case 'Strongly Disagree':
        return 1;
      default:
        return 0;
    }
  };
  const aggregate_by_string_subset = (string_subset, responseData) => {
    const values = Object.keys(responseData).map((key) => {
      if (key.includes(string_subset)) {
        return mapResponseToScore(responseData[key]);
      }
      return undefined
    });
    return mean(values);
  };
  
  export const transformAverageData = (responseAverageData) => {
    const d =   Object.keys(responseAverageData).map((k) =>{
      console.log(1)
      return mean(responseAverageData[k])
    }
    )
    return d
  }
  const transformResponseData = (responseData) => {
    const radarChartData = {
      categories: [
        ['Growth', 'Mindset'],
        ['Communication', 'Ability'],
        ['Data Collection', 'and', 'Decision-making', 'Abilities'],
        ['Decision-making'],
        ['Problem-solving', 'Ability'],
        ['Leadership - Humanistic', '(Respect)'],
        ['Leadership - Organizational', '(Systematic)'],
      ],
      scores:scoreGroupUserMean(responseData)
    };
  
    const groupedData = {
      growthMindset: {
        categories: [
          'Experiences',
          'Attribute of Learning',
          'Resiliency',
          'Belief in Talent',
          'Appearance',
          'Resp Behaviors',
          'Self Evaluation',
          'Habit of Writing',
        ],
        scores: scoreGroup.growthMindset.map((item) => aggregate_by_string_subset(item, responseData))
      },
      communicationAbility: {
        categories: [
          'Listening',
          ['Communication', 'Environment'],
          ['Operating through', 'Communication'],
          'Lead under Policy',
        ],
        scores: scoreGroup.communicationAbility.map((item) => aggregate_by_string_subset(item, responseData))
      },
      humanResourcesManagement: {
        categories: [
          ['Human', 'Resources', 'Management'],
          'Conflicts Management',
        ],
        scores: scoreGroup.humanResourcesManagement.map((item) => aggregate_by_string_subset(item, responseData))
      },
      decisionMaking: {
        categories: [
          'Data Collection',
          ['Reasonable', 'Decision', 'Making'],
          'Decision Ability',
        ],
        scores: scoreGroup.decisionMaking.map((item) => aggregate_by_string_subset(item, responseData))
      },
      problemSolvingAbility: {
        categories: ['Problem Solving Ability'],
        scores: scoreGroup.problemSolvingAbility.map((item) => aggregate_by_string_subset(item, responseData))
      },
      leadershipHumanistic: {
        categories: [
          'Vision',
          'Role Model',
          'Mannerism',
          'Compassion for Others',
        ],
        scores: scoreGroup.leadershipHumanistic.map((item) => aggregate_by_string_subset(item, responseData))
      },
      leadershipOrganizational: {
        categories: [
          'Human Development',
          'Organizational Management',
          'Project Management',
          'Administration',
          'Guiding Skill',
        ],
        scores: scoreGroup.leadershipOrganizational.map((item) => aggregate_by_string_subset(item, responseData))
      },
    };
  
    return { radarChartData, groupedData };
  };
  
  export default transformResponseData;