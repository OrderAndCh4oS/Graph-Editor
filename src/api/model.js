import models from './models';

const fetchModel = (slug) => new Promise(resolve => resolve(models[slug]));

export default fetchModel;
