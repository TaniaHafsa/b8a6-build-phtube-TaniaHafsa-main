const handleCateogry = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  // console.log(data.data.category)

  const categoryContainer = document.getElementById("categoryContainer");
  // console.log(categoryContainer)
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="loadVideos('${category.category_id}')" class="btn focus:bg-red-500" >${category.category}</button>
        `;

    categoryContainer.appendChild(div);
    // console.log(category.category)
  });
};

const loadVideos = async (categoryID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await res.json();
  let alldata = data.data;


  const cardContainer = document.getElementById("cardContainer");

  drawingDiv.innerHTML = "";
  if (data.data.length === 0) {
    const drawingDiv = document.getElementById("drawingDiv");
    const div = document.createElement("div");

    div.innerHTML = `<div class="flex items-center justify-center flex-col p-6">
        <div>
            <img src="./images/Icon.png" alt="">
        </div>
        <div>
            <h1 class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
        </div>

  </div>`;
    drawingDiv.appendChild(div);
  }

  cardContainer.innerHTML = " ";
  data.data.forEach((videos) => {
    const div = document.createElement("div");

    const date = videos.others.posted_date;

    const dateInt = parseInt(date);

    const hours = Math.floor(dateInt / 3600);
    let rem = dateInt % 3600;
    const mins = Math.floor(rem / 60);
    console.log(dateInt);
    console.log("hours", hours);
    console.log("mins", mins);

    div.innerHTML = `
        <div class="flex flex-col gap-4">
                <div class="relative">
                    <img class="rounded-xl w-[312px] h-[200px]" src=${videos.thumbnail
      } alt="">
                    <div class="absolute right-2 bottom-1 rounded-lg bg-black text-white">   
                        <p id="postedDate">${hours} hours and ${mins} mins ago</p>
                    </div>
                </div>
                <div class="flex flex-row gap-4 items-start">
                    <div>
                        <div class="avatar">
                            <div class="w-12 rounded-full ">
                              <img src=${videos.authors[0].profile_picture} />
                            </div>
                          </div>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold">${videos.title}</h1>
                        <div id="verifiedImg" class="flex items-center gap-1">
                        <p>${videos.authors[0].profile_name} 
                        </p>
                        <span id="spanId">${videos.authors[0].verified
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_13_1000)">
                          <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                          <path d="M12.7093 7.20637L9.14053 10.7751L7.29053 8.92668C6.88897 8.52512 6.2374 8.52512 5.83584 8.92668C5.43428 9.32824 5.43428 9.97981 5.83584 10.3814L8.43115 12.9767C8.82178 13.3673 9.45615 13.3673 9.84678 12.9767L14.1624 8.66106C14.564 8.25949 14.564 7.60793 14.1624 7.20637C13.7608 6.80481 13.1108 6.80481 12.7093 7.20637Z" fill="#FFFCEE"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_13_1000">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>`
        : ""
      }</span>
                        </div>
                        
                        <p>${videos.others.views}</p>


                    </div>
                </div>
            </div>`;

    cardContainer.appendChild(div);
  });

  const sortButton = document.getElementById("sortButton");


  sortButton.addEventListener("click", function () {

    alldata.sort((a, b) => {
      const viewsA = parseFloat(a.others.views.replace(/[^\d.]/g, ""));
      const viewsB = parseFloat(b.others.views.replace(/[^\d.]/g, ""));

      return viewsB - viewsA;
    });

    alldata.forEach((videos) => {

      const cardContainer = document.getElementById("cardContainer");
      console.log(cardContainer);

      cardContainer.innerHTML = "";


      cardContainer.innerHTML = "";
      alldata.forEach((videos) => {
        const date = videos.others.posted_date;

        const dateInt = parseInt(date);

        const hours = Math.floor(dateInt / 3600);
        let rem = dateInt % 3600;
        const mins = Math.floor(rem / 60);
        console.log(dateInt);
        console.log("hours", hours);
        console.log("mins", mins);
        const div = document.createElement("div");
        div.innerHTML = `
                <div class="flex flex-col gap-4">
                <div class="relative">
                <img class="rounded-xl w-[312px] h-[200px]" src=${videos.thumbnail
          } alt="">
                <div class="absolute right-0 bottom-1 rounded-lg bg-black text-white">   
                    <p id="postedDate">${hours} hours and ${mins} mins ago</p>
                </div>
            </div>
                        <div class="flex flex-row gap-4 items-start">
                            <div>
                                <div class="avatar">
                                    <div class="w-12 rounded-full ">
                                      <img src=${videos.authors[0].profile_picture
          } />
                                    </div>
                                  </div>
                            </div>
                            <div>
                                <h1 class="text-xl font-bold">${videos.title
          }</h1>
                                <div id="verifiedImg" class="flex items-center gap-1">
                                <p>${videos.authors[0].profile_name} 
                                </p>
                                <span id="spanId">${videos.authors[0].verified
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_13_1000)">
                                  <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                                  <path d="M12.7093 7.20637L9.14053 10.7751L7.29053 8.92668C6.88897 8.52512 6.2374 8.52512 5.83584 8.92668C5.43428 9.32824 5.43428 9.97981 5.83584 10.3814L8.43115 12.9767C8.82178 13.3673 9.45615 13.3673 9.84678 12.9767L14.1624 8.66106C14.564 8.25949 14.564 7.60793 14.1624 7.20637C13.7608 6.80481 13.1108 6.80481 12.7093 7.20637Z" fill="#FFFCEE"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_13_1000">
                                    <rect width="20" height="20" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>`
            : ""
          }</span>
                                </div>
                                
                                <p>${videos.others.views}</p>
        
        
                            </div>
                        </div>
                    </div>`;

        cardContainer.appendChild(div);
      });
    });
  });
};

handleCateogry();
loadVideos("1000");