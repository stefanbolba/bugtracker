import { status } from './base';

export const pieChart = (state) => {
  let open = 0;
  let closed = 0;
  let inProgress = 0;
  let resolved = 0;
  const length = state.length;
  

  state.forEach((el) => {
    if (el.status === 'open') open++;
    if (el.status === 'closed') closed++;
    if (el.status === 'in progress') inProgress++;
    if (el.status === 'resolved') resolved++;
  });
  //Update the ledger
  status.open.innerText = open;
  status.closed.innerText = closed;
  status.inProgress.innerText = inProgress;
  status.resolved.innerText = resolved;
  //Create the pie chart
  const markup = `
        <div class="pie--segment" style="--offset: 100; --value: ${
          (open * 100) / length
        }; --bg: #f45e51; --over50: 0"></div>                            
        <div class="pie--segment" style="--offset: ${
          100 + (open * 100) / length
        }; --value: ${(closed * 100) / length}; --bg: #c5d91d;"></div>
        <div class="pie--segment" style="--offset: ${
          100 + (open * 100) / length + (closed * 100) / length
        }; --value: ${(inProgress * 100) / length}; --bg: #4488c5;"></div>
        <div class="pie--segment" style="--offset: ${
          100 +
          (open * 100) / length +
          (closed * 100) / length +
          (inProgress * 100) / length
        }; --value: ${(resolved * 100) / length}; --bg: #5eb5a6;"></div>  
    `;
  status.pieContainer.innerHTML = '';
  status.pieContainer.insertAdjacentHTML('beforeend', markup);
  
};
export const graph = (state, categories) => { 
  //Clear the container
  status.categoryContainer.innerHTML = '';

  categories.forEach((el) => {
    let total = 0;
    let open = 0;
    let closed = 0;
    let inProgress = 0;
    let resolved = 0;
    let markup;

    state.forEach((issue) => {
      if (issue.category === el.name) {
        total++;
        if (issue.status === 'open') open++;
        if (issue.status === 'closed') closed++;
        if (issue.status === 'in progress') inProgress++;
        if (issue.status === 'resolved') resolved++;
      }
    });
    //Create the graph
    if (total) {
      markup = `
                <div class="category--entry">
                    <h4>${el.name}</h4>
                    <div class="category__graph">
                        <span data-tooltip="${open} Open" data-tooltip-position="top" style="width: ${
        (open / total) * 100
      }%; background-color: #f45e51"></span>
                        <span data-tooltip="${closed} Closed" data-tooltip-position="top" style="width: ${
        (closed / total) * 100
      }%; background-color: #c5d91d;"></span>
                        <span data-tooltip="${inProgress} In Progress" data-tooltip-position="top" style="width: ${
        (inProgress / total) * 100
      }%; background-color: #4488c5;"></span>
                        <span data-tooltip="${resolved} Resolved" data-tooltip-position="top" style="width: ${
        (resolved / total) * 100
      }%; background-color: #5eb5a6;"></span>
                    </div>
                </div>   
            `;
    } else {
      markup = `
            <div class="category--entry">
                <h4>${el.name}</h4>
                <div class="category__graph" data-tooltip="No entries" data-tooltip-position="top" >
                </div>
            </div>  
            `;
    }
    status.categoryContainer.insertAdjacentHTML('beforeend', markup);
  });
};
