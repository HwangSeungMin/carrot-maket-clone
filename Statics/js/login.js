const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  let cookies;
  const res = await fetch("/login", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      cookies = document.cookie;
    })
    .catch((error) => console.log(error));
  console.log(cookies);
  //const data = await res.json();
  // const accessToken = data.access_token;
  const accessToken = cookies.split("=")[1];
  if (accessToken) {
    //localStorage.setItem("token", accessToken);
    //window.sessionStorage.setItem("token", accessToken);
    window.location.pathname = "/";
  }

  //   모든 아이템 리스트 조회
  console.log("accessToken", accessToken);
  const res2 = await fetch("/items", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  const data2 = await res2.json();
  console.log(data2);

  if (res.status === 200) {
    alert("로그인에 성공했습니다!");
    window.location.pathname = "/";
  } else if (res.status === 401) {
    alert("id 혹은 password가 틀렸습니다.");
  }
};

form.addEventListener("submit", handleSubmit);
