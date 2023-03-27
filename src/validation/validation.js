const validation = (schema, userInput) => {
  let errorObjArr = {};
  const { error } = schema.validate(userInput, { abortEarly: false });
  if (!error) {
    return null;
  }
  const { details } = error;
console.log("details",details);
  for (let item of details) {
    if (!errorObjArr[item.context.key]) {
      errorObjArr[item.context.key] = [];
    }
    errorObjArr[item.context.key] = [
      ...errorObjArr[item.context.key],
      item.message,
    ];
    
  }
  return errorObjArr;
};
export default validation;
