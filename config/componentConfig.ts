import { EditableTabs } from "@/components/editable/EditableTabs"
import { EditableTooltip } from "@/components/editable/EditableTooltip"
import { EditableToggle } from "@/components/editable/EditableToggle"
import { TabsConfigPanel } from "@/components/config-panels/TabsConfigPanel"
import { TooltipConfigPanel } from "@/components/config-panels/TooltipConfigPanel"
import { ToggleConfigPanel } from "@/components/config-panels/ToggleConfigPanel"

import { EditableSheet } from "@/components/editable/EditableSheet"
import { EditableSkeleton } from "@/components/editable/EditableSkeleton"
import { SheetConfigPanel } from "@/components/config-panels/SheetConfigPanel"
import { SkeletonConfigPanel } from "@/components/config-panels/SkeletonConfigPanel"

import { EditableButton } from "@/components/editable/EditableButton"
import { EditableInput } from "@/components/editable/EditableInput"
import { EditableCheckbox } from "@/components/editable/EditableCheckbox"
import { EditableSelect } from "@/components/editable/EditableSelect"
import { EditableTextarea } from "@/components/editable/EditableTextarea"
import { EditableRadioGroup } from "@/components/editable/EditableRadioGroup"
import { EditableSwitch } from "@/components/editable/EditableSwitch"
import { EditableSlider } from "@/components/editable/EditableSlider"
import { EditableDatePicker } from "@/components/editable/EditableDatePicker"
import { EditableFileUpload } from "@/components/editable/EditableFileUpload"
import { EditableInputOTP } from "@/components/editable/EditableInputOTP"
import { EditablePassword } from "@/components/editable/EditablePassword"
import { EditableAccordion } from "@/components/editable/EditableAccordion"
import { EditableAlert } from "@/components/editable/EditableAlert"
import { EditableAlertDialog } from "@/components/editable/EditableAlertDialog"
import { EditableAvatar } from "@/components/editable/EditableAvatar"
import { EditableBadge } from "@/components/editable/EditableBadge"
import { EditableBreadcrumb } from "@/components/editable/EditableBreadcrumb"
import { EditableCalendar } from "@/components/editable/EditableCalendar"
import { EditableCard } from "@/components/editable/EditableCard"
import { EditableCarousel } from "@/components/editable/EditableCarousel"
import { EditableCollapsible } from "@/components/editable/EditableCollapsible"
import { EditableCombobox } from "@/components/editable/EditableCombobox"
import { EditableCommand } from "@/components/editable/EditableCommand"
import { EditableContextMenu } from "@/components/editable/EditableContextMenu"
import { EditableDataTable } from "@/components/editable/EditableDataTable"
import { EditableDialog } from "@/components/editable/EditableDialog"
import { EditableDrawer } from "@/components/editable/EditableDrawer"
import { EditableDropdownMenu } from "@/components/editable/EditableDropdownMenu"
import { EditableForm } from "@/components/editable/EditableForm"
import { EditableHoverCard } from "@/components/editable/EditableHoverCard"
import { EditableNavigationMenu } from "@/components/editable/EditableNavigationMenu"
import { EditablePagination } from "@/components/editable/EditablePagination"
import { HoverCardConfigPanel } from "@/components/config-panels/HoverCardConfigPanel"
import { NavigationMenuConfigPanel } from "@/components/config-panels/NavigationMenuConfigPanel"
import { PaginationConfigPanel } from "@/components/config-panels/PaginationConfigPanel"
import { EditablePopover } from "@/components/editable/EditablePopover"
import { EditableProgress } from "@/components/editable/EditableProgress"
import { EditableScrollArea } from "@/components/editable/EditableScrollArea"
import { EditableSeparator } from "@/components/editable/EditableSeparator"
import { PopoverConfigPanel } from "@/components/config-panels/PopoverConfigPanel"
import { ProgressConfigPanel } from "@/components/config-panels/ProgressConfigPanel"
import { ScrollAreaConfigPanel } from "@/components/config-panels/ScrollAreaConfigPanel"
import { SeparatorConfigPanel } from "@/components/config-panels/SeparatorConfigPanel"
import { EditableToast } from "@/components/editable/EditableToast"
import { ToastConfigPanel } from "@/components/config-panels/ToastConfigPanel"
import { EditableToggleGroup } from "@/components/editable/EditableToggleGroup"
import { ToggleGroupConfigPanel } from "@/components/config-panels/ToggleGroupConfigPanel"
import { BreadcrumbConfigPanel } from "@/components/config-panels/BreadcrumbConfigPanel"
import { BadgeConfigPanel } from "@/components/config-panels/BadgeConfigPanel"
import { AvatarConfigPanel } from "@/components/config-panels/AvatarConfigPanel"
import { AccordionConfigPanel } from "@/components/config-panels/AccordionConfigPanel"
import { AlertConfigPanel } from "@/components/config-panels/AlertConfigPanel"
import { CarouselConfigPanel } from "@/components/config-panels/CarouselConfigPanel"
import { CollapsibleConfigPanel } from "@/components/config-panels/CollapsibleConfigPanel"
import { CardConfigPanel } from "@/components/config-panels/CardConfigPanel"

export const componentConfig = {
  Button: {
    component: EditableButton,
    defaultProps: {
      label: "Button",
      variant: "default",
      size: "default",
      disabled: false,
      onlyIcon: false,
      destructive: false,
      dot: false,
      leadIcon: false,
      tailIcon: false,
      badge: "",
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      {
        name: "variant",
        type: "select",
        label: "Variant",
        options: ["default", "secondary", "outline", "ghost", "link"],
      },
      { name: "size", type: "select", label: "Size", options: ["default", "sm", "lg"] },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "onlyIcon", type: "switch", label: "Only Icon" },
      { name: "destructive", type: "switch", label: "Destructive" },
      { name: "dot", type: "switch", label: "Dot" },
      { name: "leadIcon", type: "switch", label: "Lead Icon" },
      { name: "tailIcon", type: "switch", label: "Tail Icon" },
      { name: "badge", type: "text", label: "Badge" },
    ],
  },
  Input: {
    component: EditableInput,
    defaultProps: {
      label: "Input Label",
      placeholder: "Enter text...",
      type: "text",
      required: false,
      disabled: false,
      showLabel: true,
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "placeholder", type: "text", label: "Placeholder" },
      {
        name: "type",
        type: "select",
        label: "Type",
        options: ["text", "email", "password", "number", "tel", "url", "date", "time", "search"],
      },
      { name: "description", type: "text", label: "Description" },
      { name: "required", type: "switch", label: "Required" },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "showLabel", type: "switch", label: "Show Label" },
    ],
  },
  Checkbox: {
    component: EditableCheckbox,
    defaultProps: {
      label: "Checkbox Label",
      disabled: false,
      showLabel: false,
      options: ["Option 1"],
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "showLabel", type: "switch", label: "Show Label" },
    ],
  },
  Select: {
    component: EditableSelect,
    defaultProps: {
      label: "Select Label",
      placeholder: "Select an option",
      options: ["Option 1", "Option 2", "Option 3"],
      showLabel: true,
      description: "",
      helpIcon: false,
      optional: false,
      avatarImage: false,
      leadIcon: false,
      size: "default",
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "placeholder", type: "text", label: "Placeholder" },
      { name: "description", type: "text", label: "Description" },
      { name: "size", type: "select", label: "Size", options: ["sm", "default", "lg"] },
      { name: "showLabel", type: "switch", label: "Show Label" },
      { name: "helpIcon", type: "switch", label: "Help Icon" },
      { name: "optional", type: "switch", label: "Optional" },
      { name: "avatarImage", type: "switch", label: "Avatar Image" },
      { name: "leadIcon", type: "switch", label: "Lead Icon" },
    ],
  },
  Textarea: {
    component: EditableTextarea,
    defaultProps: {
      label: "Textarea Label",
      placeholder: "Enter text...",
      required: false,
      showLabel: true,
      description: "",
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "placeholder", type: "text", label: "Placeholder" },
      { name: "description", type: "text", label: "Description" },
      { name: "required", type: "switch", label: "Required" },
      { name: "showLabel", type: "switch", label: "Show Label" },
    ],
  },
  "Radio Group": {
    component: EditableRadioGroup,
    defaultProps: {
      label: "Radio Group Label",
      options: ["Option 1", "Option 2"],
      showLabel: false,
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "showLabel", type: "switch", label: "Show Label" },
    ],
  },
  Switch: {
    component: EditableSwitch,
    defaultProps: {
      label: "Switch Label",
      disabled: false,
      showLabel: false,
      options: ["Option 1"],
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "showLabel", type: "switch", label: "Show Label" },
    ],
  },
  Slider: {
    component: EditableSlider,
    defaultProps: {
      label: "Slider Label",
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      showLabel: false,
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "min", type: "number", label: "Min" },
      { name: "max", type: "number", label: "Max" },
      { name: "step", type: "number", label: "Step" },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "showLabel", type: "switch", label: "Show Label" },
    ],
  },
  "Date Picker": {
    component: EditableDatePicker,
    defaultProps: {
      label: "Date Picker Label",
      placeholder: "Select a date",
      disabled: false,
      required: false,
      description: "",
      showClearButton: true,
      showLabel: true,
      leadIcon: true,
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "placeholder", type: "text", label: "Placeholder" },
      { name: "description", type: "text", label: "Description" },
      { name: "required", type: "switch", label: "Required" },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "showClearButton", type: "switch", label: "Show Clear Button" },
      { name: "showLabel", type: "switch", label: "Show Label" },
    ],
  },
  Uploader: {
    component: EditableFileUpload,
    defaultProps: {
      label: "Upload File",
      titleText: "Choose a file or drag & drop it here",
      instructions: "JPEG and PNG formats, up to 20MB",
      description: "",
      buttonText: "Browse File",
      required: false,
      disabled: false,
      showLabel: true,
      multiple: false,
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "titleText", type: "text", label: "Title text" },
      { name: "instructions", type: "text", label: "Instructions" },
      { name: "description", type: "text", label: "Description" },
      { name: "buttonText", type: "text", label: "Button text" },
      { name: "required", type: "switch", label: "Required" },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "showLabel", type: "switch", label: "Show Label" },
      { name: "multiple", type: "switch", label: "Allow multiple files" },
    ],
  },
  "Input OTP": {
    component: EditableInputOTP,
    defaultProps: {
      label: "One-Time Password",
      length: 6,
      groupLength: 3,
      required: false,
      disabled: false,
      description: "",
      showLabel: true,
      blockDivider: false,
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "description", type: "text", label: "Description" },
      { name: "length", type: "number", label: "Length" },
      { name: "groupLength", type: "number", label: "Group Length" },
      { name: "required", type: "switch", label: "Required" },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "showLabel", type: "switch", label: "Show Label" },
      { name: "blockDivider", type: "switch", label: "Block Divider" },
    ],
  },
  Password: {
    component: EditablePassword,
    defaultProps: {
      label: "Password",
      placeholder: "Enter password",
      required: false,
      disabled: false,
      showLabel: true,
      helpIcon: false,
      optional: false,
      leadIcon: false,
      viewPassword: true,
    },
    editFields: [
      { name: "label", type: "text", label: "Label" },
      { name: "placeholder", type: "text", label: "Placeholder" },
      { name: "required", type: "switch", label: "Required" },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "showLabel", type: "switch", label: "Show Label" },
      { name: "helpIcon", type: "switch", label: "Help Icon" },
      { name: "optional", type: "switch", label: "Optional" },
      { name: "leadIcon", type: "switch", label: "Lead Icon" },
      { name: "viewPassword", type: "switch", label: "View Password" },
    ],
  },
  Accordion: {
    component: EditableAccordion,
    defaultProps: {
      items: [
        {
          title: "What is BuilderUI?",
          content:
            "BuilderUI is a powerful component generation platform that allows you to visually design, customize, and export UI components for your web applications. It provides a library of pre-built components that you can configure to match your design system without writing code.",
          showButton: false,
          buttonText: "Learn More",
        },
        {
          title: "How do I customize components?",
          content:
            "Simply select a component from the library and use the configuration panel on the right to adjust its properties. You can modify styles, content, behavior, and more. Changes are reflected in real-time in the preview area, allowing you to see exactly how your component will look.",
          showButton: false,
          buttonText: "View Tutorial",
        },
        {
          title: "Can I export the components?",
          content:
            "Yes! Once you've customized a component to your liking, you can export it as React code that you can directly use in your projects. The exported code is clean, well-structured, and follows best practices for React development.",
          showButton: false,
          buttonText: "Export Guide",
        },
        {
          title: "Is BuilderUI compatible with my tech stack?",
          content:
            "BuilderUI generates components based on React and Tailwind CSS, which can be integrated into most modern web development stacks. The components are built on top of shadcn/ui, making them highly customizable and adaptable to different design systems.",
          showButton: false,
          buttonText: "Compatibility Details",
        },
      ],
      type: "single",
      collapsible: false,
      iconPosition: "left",
      disableHover: false,
    },
    configPanel: AccordionConfigPanel,
  },
  Alert: {
    component: EditableAlert,
    defaultProps: {
      title: "Alert Title",
      description: "Alert Description",
      variant: "default",
      icon: "info",
      showIcon: true,
      showCloseButton: false,
      showActionButton: false,
      actionButtonText: "Action",
      emphasis: "low",
      size: "default",
    },
    configPanel: AlertConfigPanel,
  },
  "Alert Dialog": {
    component: EditableAlertDialog,
    defaultProps: {
      triggerText: "Open",
      title: "Are you absolutely sure?",
      description:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      cancelText: "Cancel",
      actionText: "Continue",
    },
    editFields: [
      { name: "triggerText", type: "text", label: "Trigger Text" },
      { name: "title", type: "text", label: "Title" },
      { name: "description", type: "text", label: "Description" },
      { name: "cancelText", type: "text", label: "Cancel Text" },
      { name: "actionText", type: "text", label: "Action Text" },
    ],
  },
  Avatar: {
    component: EditableAvatar,
    defaultProps: {
      style: "single",
      shape: "circle",
      type: "text",
      size: "md",
      src: "",
      alt: "Avatar",
      fallback: "A",
      online: false,
      showCheck: false,
      users: 1,
      showMore: false,
    },
    configPanel: AvatarConfigPanel,
  },
  Badge: {
    component: EditableBadge,
    defaultProps: {
      text: "Badge",
      variant: "default",
      size: "2xsmall",
      colour: "accent",
      emphasis: "low",
      textCase: "default",
      iconOnly: false,
      counter: false,
      checkbox: false,
      dot: false,
      avatar: false,
      flag: false,
      tailIcon: false,
      leadIcon: false,
      appIcon: false,
    },
    configPanel: BadgeConfigPanel,
  },
  Breadcrumb: {
    component: EditableBreadcrumb,
    defaultProps: {
      items: [
        { type: "link", label: "Home", href: "/" },
        {
          type: "ellipsis",
          label: "...",
          dropdownItems: [
            { label: "Documentation", href: "#" },
            { label: "Themes", href: "#" },
            { label: "GitHub", href: "#" },
          ],
        },
        { type: "link", label: "Components", href: "/components" },
        { type: "page", label: "Breadcrumb" },
      ],
      separator: "slash",
      size: "md",
      showIcon: true,
      iconPosition: "left",
    },
    configPanel: BreadcrumbConfigPanel,
  },
  Calendar: {
    component: EditableCalendar,
    defaultProps: {
      mode: "single",
      selected: new Date(),
      disabled: false,
      numberOfMonths: 1,
    },
    editFields: [
      { name: "mode", type: "select", label: "Mode", options: ["single", "multiple", "range"] },
      { name: "disabled", type: "switch", label: "Disabled" },
      { name: "numberOfMonths", type: "number", label: "Number of Months" },
    ],
  },
  Card: {
    component: EditableCard,
    defaultProps: {
      cardType: "default",
      title: "Create project",
      description: "Deploy your new project in one-click.",
      showHeader: true,
      showFooter: true,
      width: "w-[350px]",
      rounded: "md",
      bordered: true,
      elevated: false,
      buttonLayout: "side-by-side",
      buttonVariant: "outline",
    },
    configPanel: CardConfigPanel,
  },
  "Payment Card": {
    component: EditableCard,
    defaultProps: {
      cardType: "payment",
      title: "Payment Method",
      description: "Add a new payment method to your account",
      showHeader: true,
      showFooter: true,
      width: "w-[350px]",
      rounded: "md",
      bordered: true,
      elevated: false,
      showPaymentIcons: true,
      showCVC: true,
    },
    configPanel: CardConfigPanel,
  },
  "Account Card": {
    component: EditableCard,
    defaultProps: {
      cardType: "account",
      title: "Create an account",
      description: "Enter your email below to create your account",
      showHeader: true,
      showFooter: true,
      width: "w-[350px]",
      rounded: "md",
      bordered: true,
      elevated: false,
    },
    configPanel: CardConfigPanel,
  },
  "Shared Card": {
    component: EditableCard,
    defaultProps: {
      cardType: "shared",
      title: "Share this document",
      description: "Anyone with the link can view this document.",
      showHeader: true,
      showFooter: false,
      width: "w-[600px]",
      rounded: "lg",
      bordered: true,
      elevated: false,
    },
    configPanel: CardConfigPanel,
  },
  Carousel: {
    component: EditableCarousel,
    defaultProps: {
      items: [{ content: "Slide 1", imageUrl: "" }],
      showControls: true,
      autoPlay: false,
      loop: false,
      draggable: false,
      orientation: "horizontal",
      showAPI: false,
    },
    configPanel: CarouselConfigPanel,
  },
  Collapsible: {
    component: EditableCollapsible,
    defaultProps: {
      triggerText: "@peduarte starred 3 repositories",
      content: ["@radix-ui/primitives", "@radix-ui/colors", "@stitches/react"],
      open: false,
      disabled: false,
      animated: true,
    },
    configPanel: CollapsibleConfigPanel,
  },
  Combobox: {
    component: EditableCombobox,
    defaultProps: {
      placeholder: "Select an option",
      emptyText: "No results found",
      items: [
        { value: "item1", label: "Item 1" },
        { value: "item2", label: "Item 2" },
        { value: "item3", label: "Item 3" },
      ],
    },
    editFields: [
      { name: "placeholder", type: "text", label: "Placeholder" },
      { name: "emptyText", type: "text", label: "Empty Text" },
      { name: "items", type: "array", label: "Combobox Items" },
    ],
  },
  Command: {
    component: EditableCommand,
    defaultProps: {
      placeholder: "Type a command or search...",
      emptyMessage: "No results found.",
      items: [
        {
          group: "Suggestions",
          items: [
            { value: "calendar", label: "Calendar" },
            { value: "search", label: "Search" },
            { value: "settings", label: "Settings" },
          ],
        },
      ],
    },
    editFields: [],
  },
  "Context Menu": {
    component: EditableContextMenu,
    defaultProps: {
      triggerText: "Right click here",
      items: [
        { label: "Back", action: "back" },
        { label: "Forward", action: "forward" },
        { label: "Reload", action: "reload" },
        {
          label: "More Tools",
          items: [
            { label: "Save Page As...", action: "save" },
            { label: "Create Shortcut...", action: "shortcut" },
          ],
        },
      ],
    },
    editFields: [],
  },
  "Data Table": {
    component: EditableDataTable,
    defaultProps: {
      columns: [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
      ],
      data: [
        { name: "John Doe", email: "john@example.com", role: "Admin" },
        { name: "Jane Smith", email: "jane@example.com", role: "User" },
      ],
    },
    editFields: [],
  },
  Dialog: {
    component: EditableDialog,
    defaultProps: {
      triggerText: "Open Dialog",
      title: "Dialog Title",
      description: "Dialog Description",
      content: "Dialog Content",
      cancelText: "Cancel",
      confirmText: "Confirm",
    },
    editFields: [
      { name: "triggerText", type: "text", label: "Trigger Text" },
      { name: "title", type: "text", label: "Title" },
      { name: "description", type: "text", label: "Description" },
      { name: "content", type: "textarea", label: "Content" },
      { name: "cancelText", type: "text", label: "Cancel Text" },
      { name: "confirmText", type: "text", label: "Confirm Text" },
    ],
  },
  Drawer: {
    component: EditableDrawer,
    defaultProps: {
      triggerText: "Open Drawer",
      title: "Drawer Title",
      description: "Drawer Description",
      content: "Drawer Content",
      closeText: "Close",
    },
    editFields: [
      { name: "triggerText", type: "text", label: "Trigger Text" },
      { name: "title", type: "text", label: "Title" },
      { name: "description", type: "text", label: "Description" },
      { name: "content", type: "textarea", label: "Content" },
      { name: "closeText", type: "text", label: "Close Text" },
    ],
  },
  "Dropdown Menu": {
    component: EditableDropdownMenu,
    defaultProps: {
      triggerText: "Open Menu",
      items: [
        { type: "item", text: "Item 1" },
        { type: "item", text: "Item 2" },
        { type: "separator" },
        { type: "item", text: "Item 3" },
      ],
    },
    editFields: [
      { name: "triggerText", type: "text", label: "Trigger Text" },
      { name: "items", type: "array", label: "Menu Items" },
    ],
  },
  Form: {
    component: EditableForm,
    defaultProps: {
      fields: [
        { name: "username", label: "Username", type: "text", placeholder: "Enter your username" },
        { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
        { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
      ],
      submitText: "Submit",
    },
    editFields: [
      { name: "fields", type: "array", label: "Form Fields" },
      { name: "submitText", type: "text", label: "Submit Text" },
    ],
  },
  "Hover Card": {
    component: EditableHoverCard,
    defaultProps: {
      triggerText: "Hover me",
      content: "This is the hover card content.",
    },
    configPanel: HoverCardConfigPanel,
  },
  "Navigation Menu": {
    component: EditableNavigationMenu,
    defaultProps: {
      items: [
        {
          title: "Home",
          href: "#",
        },
        {
          title: "Products",
          items: [
            {
              title: "Product A",
              href: "#",
              description: "This is product A",
            },
            {
              title: "Product B",
              href: "#",
              description: "This is product B",
            },
          ],
        },
        {
          title: "About",
          href: "#",
        },
      ],
    },
    configPanel: NavigationMenuConfigPanel,
  },
  Pagination: {
    component: EditablePagination,
    defaultProps: {
      totalPages: 10,
      currentPage: 1,
      showPrevNext: true,
      showEllipsis: true,
    },
    configPanel: PaginationConfigPanel,
  },
  Popover: {
    component: EditablePopover,
    defaultProps: {
      triggerText: "Open Popover",
      content: "This is the popover content.",
    },
    configPanel: PopoverConfigPanel,
  },
  Progress: {
    component: EditableProgress,
    defaultProps: {
      value: 50,
      max: 100,
      showValue: false,
    },
    configPanel: ProgressConfigPanel,
  },
  "Scroll Area": {
    component: EditableScrollArea,
    defaultProps: {
      content: "This is the scroll area content.\n\nIt can contain multiple paragraphs.",
      height: "200px",
    },
    configPanel: ScrollAreaConfigPanel,
  },
  Separator: {
    component: EditableSeparator,
    defaultProps: {
      orientation: "horizontal",
      className: "",
    },
    configPanel: SeparatorConfigPanel,
  },
  Sheet: {
    component: EditableSheet,
    defaultProps: {
      triggerText: "Open Sheet",
      title: "Sheet Title",
      description: "Sheet Description",
      content: "Sheet Content",
      position: "right",
    },
    configPanel: SheetConfigPanel,
  },
  Skeleton: {
    component: EditableSkeleton,
    defaultProps: {
      width: "100%",
      height: "20px",
      className: "",
    },
    configPanel: SkeletonConfigPanel,
  },
  Tabs: {
    component: EditableTabs,
    defaultProps: {
      items: [
        { title: "Tab 1", content: "Tab 1 Content" },
        { title: "Tab 2", content: "Tab 2 Content" },
      ],
      defaultValue: "Tab 1",
    },
    configPanel: TabsConfigPanel,
  },
  Tooltip: {
    component: EditableTooltip,
    defaultProps: {
      triggerText: "Hover me",
      content: "Tooltip content",
      side: "top",
      align: "center",
    },
    configPanel: TooltipConfigPanel,
  },
  Toggle: {
    component: EditableToggle,
    defaultProps: {
      label: "Toggle",
      pressed: false,
      disabled: false,
      variant: "default",
      size: "default",
    },
    configPanel: ToggleConfigPanel,
  },
  Toast: {
    component: EditableToast,
    defaultProps: {
      title: "Toast Notification",
      description: "This is a toast notification.",
      action: "Undo",
      variant: "default",
      duration: 3000,
    },
    configPanel: ToastConfigPanel,
  },
  "Toggle Group": {
    component: EditableToggleGroup,
    defaultProps: {
      label: "Toggle Group",
      showLabel: true,
      type: "single",
      items: [
        { value: "item-1", label: "Item 1" },
        { value: "item-2", label: "Item 2" },
        { value: "item-3", label: "Item 3" },
      ],
      disabled: false,
      variant: "default",
      size: "default",
    },
    configPanel: ToggleGroupConfigPanel,
  },
  "Cookie Settings Card": {
    component: EditableCard,
    defaultProps: {
      cardType: "cookie-settings",
      title: "Cookie Settings",
      description: "Manage your cookie settings here.",
      showHeader: true,
      showFooter: true,
      width: "w-[400px]",
      rounded: "lg",
      bordered: true,
      elevated: false,
      cookieOptions: [
        {
          title: "Strictly Necessary",
          description: "These cookies are essential in order to use the website and use its features.",
          enabled: true,
        },
        {
          title: "Functional Cookies",
          description: "These cookies allow the website to provide personalized functionality.",
          enabled: false,
        },
        {
          title: "Performance Cookies",
          description: "These cookies help to improve the performance of the website.",
          enabled: false,
        },
      ],
    },
    configPanel: CardConfigPanel,
  },
  "Team Card": {
    component: EditableCard,
    defaultProps: {
      cardType: "team",
      title: "Team Members",
      description: "Invite your team members to collaborate.",
      showHeader: true,
      showFooter: false,
      width: "w-full",
      rounded: "md",
      bordered: true,
      elevated: false,
      teamMembers: [
        { name: "Sofia Davis", email: "m@example.com", role: "Owner" },
        { name: "Jackson Lee", email: "p@example.com", role: "Member" },
        { name: "Isabella Nguyen", email: "i@example.com", role: "Member" },
      ],
    },
    configPanel: CardConfigPanel,
  },
  "Report Card": {
    component: EditableCard,
    defaultProps: {
      cardType: "report",
      title: "Report an issue",
      description: "What area are you having problems with?",
      showHeader: true,
      showFooter: true,
      width: "w-[600px]",
      rounded: "lg",
      bordered: true,
      elevated: false,
      areas: ["Billing", "Security", "Account", "Technical", "Other"],
      severityLevels: ["Severity 1", "Severity 2", "Severity 3", "Severity 4"],
    },
    configPanel: CardConfigPanel,
  },
  Container: {
    defaultProps: {
      showHeader: true,
      showFooter: false,
      headerTitle: "Container Title",
      headerDescription: "This container groups related components together",
      footerContent: "Container Footer",
      variant: "default",
      padding: "medium",
      borderRadius: "medium",
      backgroundColor: "default",
      borderColor: "default",
      width: "full",
    },
  },
}
