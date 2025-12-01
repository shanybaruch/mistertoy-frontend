import { AccordionGroup, AccordionItem } from "../cmps/AccodionGroup.jsx";

export function AboutUs() {
    return (
        <section className="">
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <AccordionGroup>
                <AccordionItem title="The Team">
                    <h2>Our team is Here</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem >
                <AccordionItem title="About Us">
                    <h2>We are Great</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem>
                <AccordionItem title="About You">
                    <h2>You are Awesome</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem>
                <AccordionItem title="About You">
                    <h2>You are Awesome</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem>
            </AccordionGroup>
        </section>
    )
}
