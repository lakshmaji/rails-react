import React from "react";
import { createRoot } from "react-dom/client";
import {
  createInertiaApp,
  InertiaAppOptionsForCSR,
} from "@inertiajs/inertia-react";

const pages = import.meta.glob("./*.tsx");

const app = () =>
  createInertiaApp<InertiaAppOptionsForCSR<unknown>>({
    resolve: async (name) => {
      const module = await pages[`./${name}.tsx`]();
      const page = (
        module as never as { default: { layout: React.ReactFragment } }
      ).default;
      return page;
    },
    setup({ el, App, props }) {
      const container = document.getElementById(el.id);
      const root = createRoot(container!);
      root.render(<App {...props} />);
    },
  });

document.addEventListener('DOMContentLoaded', () => {
  app();
});
  