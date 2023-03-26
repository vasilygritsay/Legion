import { computed } from "vue";

export function useButtonComponent(href, to, target) {
  const component = computed(() => {
    switch (true) {
      case !!to.value:
        return {
          element: "RouterLink",
          attrs: {
            target: target.value || "",
            to: to.value,
          },
        };

      case !!href.value:
        return {
          element: "a",
          attrs: {
            target: target.value || "",
            href: href.value,
          },
        };

      default:
        return {
          element: "button",
          attrs: {
            type: "button",
          },
        };
    }
  });

  return {
    component,
  };
}
