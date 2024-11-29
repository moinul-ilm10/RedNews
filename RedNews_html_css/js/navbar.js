$(document).ready(function () {
  let isAnimating = false;

  // Open drawer
  $(".mobile-menu-icon").on("click", function () {
    if (isAnimating) return;
    isAnimating = true;

    $(".mobile-nav-overlay").addClass("active");
    $(".mobile-nav-drawer").addClass("active");

    // Prevent body scroll when drawer is open
    $("body").css("overflow", "hidden");

    setTimeout(() => {
      isAnimating = false;
    }, 300); // Match transition duration
  });

  // Close drawer function
  function closeDrawer() {
    if (isAnimating) return;
    isAnimating = true;

    $(".mobile-nav-overlay").removeClass("active");
    $(".mobile-nav-drawer").removeClass("active");

    // Re-enable body scroll
    $("body").css("overflow", "");

    setTimeout(() => {
      $(".mobile-nav-overlay").css("display", "");
      isAnimating = false;
    }, 300); // Match transition duration
  }

  // Close drawer when clicking close button
  $(".close-drawer").on("click", closeDrawer);

  // Close drawer when clicking overlay
  $(".mobile-nav-overlay").on("click", closeDrawer);

  // Close drawer when clicking a nav link
  $(".mobile-nav-drawer a").on("click", closeDrawer);

  // Handle window resize
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if ($(window).width() > 768) {
        closeDrawer();
      }
    }, 250);
  });
});

// console.log("navbar working");
