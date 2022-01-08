
document.addEventListener('DOMContentLoaded', function () {
	const allJobsContainer = document.querySelector('#alljobs-container');
	const category = document.querySelector('#id_category');
	const city = document.querySelector('#id_city');

	if (allJobsContainer) {

		fetch('all')
			.then(response => response.json())
			.then(jobs => {
				const allJobs = jobs;
				for (let i = 0; i < allJobs.length; i++) {
					if (allJobs[i].end_job == false) {
						let jobContainer = document.createElement('div');
						jobContainer.setAttribute('class', 'job-container');
						jobContainer.innerHTML = `<div class="job-title">${allJobs[i].title}</div>
						<div class="company">
						<div class="job-company"><span>Company:</span> ${allJobs[i].company}</div>
						<div class="job-city"><span>City:</span> ${ allJobs[i].city}</div>
						</div>

						<div class="category">						
						<div class="job-date"><span>Posted on :</span> ${ allJobs[i].timestamp}</div>
						<div class="job-category"><span>Category:</span> ${ allJobs[i].category}</div>
						<div class="job-salary"><span>Salary: </span>${ allJobs[i].salary } &euro;</div>
						</div>
						
						<div class="job-content">${ allJobs[i].description}</div>
						<div class="apply"><a class="apply-btn checked btn btnsecondary /active" href="/apply/${ allJobs[i].id}">Apply</a></div>`;

						document.querySelector('#alljobs-container').append(jobContainer);
					}
				}
			});

		category.onchange = function () {
			allJobsContainer.innerHTML = " ";
			name = category.value;
			fetch(`/category/${name}`)
				.then(response => response.json())
				.then(result => {
					const categoryJobs = result;
					if (city.value == "All") {
						for (let i = 0; i < categoryJobs.length; i++) {
							if (categoryJobs[i].end_job == false) {
								let jobContainer = document.createElement('div');
								jobContainer.setAttribute('class', 'job-container');
								jobContainer.innerHTML = `<div class="job-title">${categoryJobs[i].title}</div>
								<div class="company">
								<div class="job-company"><span>Company:</span> ${categoryJobs[i].company}</div>
								<div class="job-city"><span>City:</span> ${ categoryJobs[i].city}</div>
								</div>
								<div class="category">
								<div class="job-date"><span>Posted on :</span> ${ categoryJobs[i].timestamp}</div>
								<div class="job-category"><span>Category:</span> ${ categoryJobs[i].category}</div>
								<div class="job-salary"><span>Salary: </span>${ categoryJobs[i].salary } &euro;</div>
								</div>

								<div class="job-content">${ categoryJobs[i].description}</div>
								<div class="apply"><a class="apply-btn checked btn btnsecondary /active" href="/apply/${ categoryJobs[i].id}">Apply</a></div>`;

								document.querySelector('#alljobs-container').append(jobContainer);
							}
						}
					} else {
						name = city.value;
						fetch(`/city/${name}`)
							.then(response => response.json())
							.then(output => {
								const cityJobs = output;
								let resultAll = [];
								for (let i = 0; i < categoryJobs.length; i++) {
									for (let j = 0; j < cityJobs.length; j++) {
										if (categoryJobs[i].city == cityJobs[j].city) {
											resultAll.push(categoryJobs[i]);
											break;
										}
									}
								}

									for (let i = 0; i < resultAll.length; i++) {
										if (resultAll[i].end_job == false) {
											let jobContainer = document.createElement('div');
											jobContainer.setAttribute('class', 'job-container');
											jobContainer.innerHTML = `<div class="job-title">${resultAll[i].title}</div>
											<div class="company">
											<div class="job-company"><span>Company:</span> ${resultAll[i].company}</div>
											<div class="job-city"><span>City:</span> ${ resultAll[i].city}</div>
											</div>
											<div class="category">
											<div class="job-date"><span>Posted on :</span> ${ resultAll[i].timestamp}</div>
											<div class="job-category"><span>Category:</span> ${ resultAll[i].category}</div>
											<div class="job-salary"><span>Salary: </span>${ resultAll[i].salary } &euro;</div>
											</div>

											<div class="job-content">${ resultAll[i].description}</div>
											<div class="apply"><a class="apply-btn checked btn btnsecondary /active" href="/apply/${ cityJobs[i].id}">Apply</a></div>`;

											document.querySelector('#alljobs-container').append(jobContainer);
										}
									}

							});
					}


					// change city
					city.onchange = function () {
						allJobsContainer.innerHTML = " ";
						name = city.value;
						fetch(`/city/${name}`)
							.then(response => response.json())
							.then(output => {
								const cityJobs = output;
								let resultAll = [];
								for (let i = 0; i < categoryJobs.length; i++) {
									for (let j = 0; j < cityJobs.length; j++) {
										if (categoryJobs[i].city == cityJobs[j].city) {
											resultAll.push(categoryJobs[i]);
											break;
										}
									}
								}
									for (let i = 0; i < resultAll.length; i++) {
										if (resultAll[i].end_job == false) {
											let jobContainer = document.createElement('div');
											jobContainer.setAttribute('class', 'job-container');
											jobContainer.innerHTML = `<div class="job-title">${resultAll[i].title}</div>
											<div class="company">
											<div class="job-company"><span>Company:</span> ${resultAll[i].company}</div>
											<div class="job-city"><span>City:</span> ${ resultAll[i].city}</div>
											</div>
											<div class="category">
											<div class="job-date"><span>Posted on :</span> ${ resultAll[i].timestamp}</div>
											<div class="job-category"><span>Category:</span> ${ resultAll[i].category}</div>
											<div class="job-salary"><span>Salary: </span>${ resultAll[i].salary } &euro;</div>
											</div>

											<div class="job-content">${ resultAll[i].description}</div>
											<div class="apply"><a class="apply-btn checked btn btnsecondary /active" href="/apply/${ cityJobs[i].id}">Apply</a></div>`;

											document.querySelector('#alljobs-container').append(jobContainer);
										}
									}

							});
					}



				});
		}


		city.onchange = function () {
			allJobsContainer.innerHTML = " ";
			name = city.value;
			fetch(`/city/${name}`)
				.then(response => response.json())
				.then(result => {
					const cityJobs = result;
					if (category.value == "All") {
						for (let i = 0; i < cityJobs.length; i++) {
							if (cityJobs[i].end_job == false) {
								let jobContainer = document.createElement('div');
								jobContainer.setAttribute('class', 'job-container');
								jobContainer.innerHTML = `<div class="job-title">${cityJobs[i].title}</div>
											<div class="company">
											<div class="job-company"><span>Company:</span> ${cityJobs[i].company}</div>
											<div class="job-city"><span>City:</span> ${ cityJobs[i].city}</div>
											</div>
											<div class="category">
											<div class="job-date"><span>Posted on :</span> ${ cityJobs[i].timestamp}</div>
											<div class="job-category"><span>Category:</span> ${ cityJobs[i].category}</div>
											<div class="job-salary"><span>Salary: </span>${ cityJobs[i].salary } &euro;</div>
											</div>
											<div class="job-content">${ cityJobs[i].description}</div>
											<div class="apply"><a class="apply-btn checked btn btnsecondary /active" href="/apply/${ cityJobs[i].id}">Apply</a></div>`;

								document.querySelector('#alljobs-container').append(jobContainer);
							}
						}
					} else {
						name = category.value;
						fetch(`/category/${name}`)
							.then(response => response.json())
							.then(output => {
								const categoryJobs = output;
								let resultAll = [];
								for (let i = 0; i < cityJobs.length; i++) {
									for (let j = 0; j < categoryJobs.length; j++) {
										if (cityJobs[i].category == categoryJobs[j].category) {
											resultAll.push(cityJobs[i]);
											break;
										}
									}
								}

									for (let i = 0; i < resultAll.length; i++) {
										if (resultAll[i].end_job == false) {
											let jobContainer = document.createElement('div');
											jobContainer.setAttribute('class', 'job-container');
											jobContainer.innerHTML = `<div class="job-title">${resultAll[i].title}</div>
											<div class="company">
											<div class="job-company"><span>Company:</span> ${resultAll[i].company}</div>
											<div class="job-city"><span>City:</span> ${ resultAll[i].city}</div>
											</div>
											<div class="category">
											<div class="job-date"><span>Posted on :</span> ${ resultAll[i].timestamp}</div>
											<div class="job-category"><span>Category:</span> ${ resultAll[i].category}</div>
											<div class="job-salary"><span>Salary: </span>${ resultAll[i].salary } &euro;</div>
											</div>

											<div class="job-content">${ resultAll[i].description}</div>
											<div class="apply"><a class="apply-btn checked btn btnsecondary /active" href="/apply/${ cityJobs[i].id}">Apply</a></div>`;

											document.querySelector('#alljobs-container').append(jobContainer);
										}
									}

							});
                    }



					// change category
					category.onchange = function () {
						allJobsContainer.innerHTML = " ";
						name = category.value;
						fetch(`/category/${name}`)
							.then(response => response.json())
							.then(output => {
								const categoryJobs = output;
								let resultAll = [];
								for (let i = 0; i < cityJobs.length; i++) {
									for (let j = 0; j < categoryJobs.length; j++) {
										if (cityJobs[i].category == categoryJobs[j].category) {
											resultAll.push(cityJobs[i]);
											break;
										}
									}
								}

								for (let i = 0; i < resultAll.length; i++) {
									if (resultAll[i].end_job == false) {
										let jobContainer = document.createElement('div');
										jobContainer.setAttribute('class', 'job-container');
										jobContainer.innerHTML = `<div class="job-title">${resultAll[i].title}</div>
											<div class="company">
											<div class="job-company"><span>Company:</span> ${resultAll[i].company}</div>
											<div class="job-city"><span>City:</span> ${ resultAll[i].city}</div>
											</div>
											<div class="category">
											<div class="job-date"><span>Posted on :</span> ${ resultAll[i].timestamp}</div>
											<div class="job-category"><span>Category:</span> ${ resultAll[i].category}</div>
											<div class="job-salary"><span>Salary: </span>${ resultAll[i].salary } &euro;</div>
											</div>

											<div class="job-content">${ resultAll[i].description}</div>
											<div class="apply"><a class="apply-btn checked btn btnsecondary /active" href="/apply/${ cityJobs[i].id}">Apply</a></div>`;

										document.querySelector('#alljobs-container').append(jobContainer);
									}
								}
							});
					}



				});
		}

	}


	// change currency
	const changeCurrency = document.querySelector('#currency-form');
	if (changeCurrency) {
		changeCurrency.onsubmit = function () {
			fetch("https://api.exchangeratesapi.io/latest?base=USD")
				.then(response => response.json())
				.then(data => {
					const currency = document.querySelector('#currency').placeholder;
					const salary = currency.substring(0, currency.indexOf(' '));
					const rate = data.rates["EUR"].toFixed(3);
					const calculate = salary / rate;
					const result = calculate.toFixed();
					document.querySelector('#result').innerHTML = `The salary is equall to ${result} $`;

				})
				.catch(error => {
					console.log('Error:', error);
				});
			return false;
		}
	}

	// disable apply button
	const jobPage = document.querySelector('.job-page');
	if (jobPage) {
		const message = document.querySelector('.alert');
		if (message.innerHTML != "") {
			const applyBtn = document.querySelector('.apply-btn');
			applyBtn.removeAttribute("href");
			applyBtn.style.background = "lightgray";
        }
    }

	
});

