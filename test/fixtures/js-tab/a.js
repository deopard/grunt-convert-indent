var a = 1;
function b () {
  c();
  function c () {
    console.log(a + "			");
    d();
    function d () {
      console.log(a + "      ");
    }
  }
}
b();
var a;
