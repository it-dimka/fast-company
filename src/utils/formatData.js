export const getProfessionById = (id, professions) => {
  for (const prof of professions) {
    if (prof?.value === id) {
      return { _id: prof?.value, name: prof?.label };
    }
  }
};
export const getQualitiesById = (elements, qualities) => {
  const qualitiesArray = [];
  for (const elem of elements) {
    for (const quality in qualities) {
      if (elem.value === qualities[quality].value) {
        qualitiesArray.push({
          _id: qualities[quality].value,
          name: qualities[quality].label,
          color: qualities[quality].color
        });
      }
    }
  }
  return qualitiesArray;
};
export const getProfessionByLabel = (professions) => {
  return Object.keys(professions).map((professionName) => ({
    label: professions[professionName].name,
    value: professions[professionName]._id
  }));
};
export const getQualitiesByLabel = (qualities) => {
  return Object.keys(qualities).map((optionName) => ({
    label: qualities[optionName].name,
    value: qualities[optionName]._id,
    color: qualities[optionName].color
  }));
};
