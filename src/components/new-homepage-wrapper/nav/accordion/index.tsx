import React, { useState } from "react";

type Props = {
  items: any;
};

export const Accordion = ({ items }: Props) => {
  const [openItems, setOpenItems] = useState(new Array(items.length).fill(true));

  const toggleItem = (index: number) => {
    const newOpenItems = [...openItems];
    newOpenItems[index] = !newOpenItems[index];
    setOpenItems(newOpenItems);
  };

  const AccordionItem = ({ title, content, isOpen, onToggle }: any) => (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onToggle}>
        {title}
        <span className={`accordion-icon ${isOpen ? "up" : ""}`}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );

  return (
    <div className="accordion">
      {items.map((item: any, index: number) => (
        <AccordionItem key={index} title={item.title} content={item.content} isOpen={openItems[index]} onToggle={() => toggleItem(index)} />
      ))}
    </div>
  );
};
