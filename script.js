// hàm lấy dữ liệu top heading từ api cho sẵn
function getNews() {
  $.ajax({
    url: "https://gnews.io/api/v4/top-headlines?&country=us&language=en&token=382175d063e3031eba0f9a47bf3e6dc8",
    type: "GET",
    dataType: "json",
    success: function (data) {
      news(data);
    },
    error: function () {
      console.log("Yêu cầu lấy dữ liệu đã gặp lỗi");
    },
  });
}
//gọi hàm để thực thi
getNews();

// hàm render tin tức ra màn hình sau khi lấy dữ liệu được từ api
function news(response) {
  //ẩn đi biểu tượng loading sau khi đã render được dữ liệu
  $("#loadSpinner").hide();
  //dùng vòng lặp để chạy qua tưng key trong object json
  for (var i = 0; i < response.articles.length; i++) {
    var html = ` <div class="post row">
                        <img
                        class="col-lg-4 col-md-4 col-12"
                        src="${response.articles[i].image}"
                        alt="${response.articles[i].title}"
                    
                        /> 
                        <div class="postContent col-lg-8 col-md-8 col-12">
                        <h6><a href="${response.articles[i].url}" target="_blank">${response.articles[i].title}</a></h6>
                        <p>${response.articles[i].publishedAt}</p>
                        <p>${response.articles[i].description}</p>
                        </div>
                    </div>
                    </div>`;

    //dùng method append để chèn nội dung biến html vào class posts chỉ định
    $(".posts").append(html);
  }
}

// tìm kiếm bằng từ khóa
$("#searchBtn").click(function () {
  //hiện  biểu tượng loading khi đang loading dữ liệu
  $("#loadSpinner").show();
  //xóa đi nội dung cũ đã render ra màn hình
  $(".posts").html("");
  //ẩn đi modal sau khi nhấn nút tìm kiếm
  $("#exampleModal").modal("hide");
  var keyword = $("#keyword").val();
  $.ajax({
    url:
      "https://gnews.io/api/v4/search?q=" +
      keyword +
      "&country=us&language=en&token=382175d063e3031eba0f9a47bf3e6dc8",
    type: "GET",
    dataType: "json",
    success: function (data) {
      news(data);
      //    console.log(data)
    },
    error: function () {
      console.log("Yêu cầu lấy dữ liệu đã gặp lỗi");
    },
  });
});
