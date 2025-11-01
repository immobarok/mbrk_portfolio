import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { HamburgerIcon } from "./HumbergerIcon";

export const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button
          className="bg-transparent"
          aria-label="Open menu"
          whileHover={{
            backgroundColor: "hsl(var(--accent) / 0.1)",
            borderColor: "hsl(var(--accent))",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <HamburgerIcon />
        </motion.button>
      </SheetTrigger>
      <SheetContent side="right">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <SheetHeader>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <SheetTitle>MBRK</SheetTitle>
            </motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <SheetDescription>
                Navigate the site: about, skills, projects, and blog.
              </SheetDescription>
            </motion.div>
          </SheetHeader>

          <nav className="flex flex-col gap-3 px-4 mt-6">
            {["About", "Skills", "Projects", "Blog", "Contact"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="py-3 text-lg hover:text-accent transition-colors duration-200 border-b border-border/50"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    duration: 0.3,
                  }}
                  whileHover={{
                    x: 8,
                    color: "hsl(var(--accent))",
                  }}
                >
                  {item}
                </motion.a>
              )
            )}
          </nav>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};
