import { elements, preview } from './base';
import { showAlert } from './../../utils/alert';

export const createPreview = (
  name,
  description,
  type,
  priority,
  duedate,
  asignee,
  category,
  version
) => {
  if (name === '' || description === '') {
    return showAlert('error', 'The subject and description are required!');
  } 
  elements.addIssueContainer.style = 'display: none;';
  elements.previewContainer.style = 'display: flex;';

  preview.name.textContent = name;
  preview.description.textContent = description;
  preview.type.textContent = type;
  preview.priority.textContent = priority;
  preview.duedate.textContent = duedate;
  preview.asignee.textContent = asignee;
  preview.category.textContent = category;
  preview.version.textContent = version;
};

export const hidePreview = () => {
  elements.previewContainer.style = 'display: none;';
  elements.addIssueContainer.style = 'display: block;';
};
