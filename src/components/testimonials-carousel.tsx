import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const TestimonialsCarousel = ({
  data,
}: {
  data: { name: string; position: string; comment: string }[]
}) => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: 'center',
        loop: true,
      }}
    >
      <CarouselContent className="-ml-8 cursor-grab active:cursor-grabbing md:-ml-16">
        {data.map((item, i) => (
          <CarouselItem key={i} className="basis-3/4 pl-8 md:basis-1/2 md:pl-16">
            <div>
              <p className="border-primary after:border-primary after:bg-secondary relative rounded-4xl border p-8 after:absolute after:top-full after:left-16 after:size-8 after:-translate-y-1/2 after:rotate-45 after:border-r after:border-b">
                {item.comment}
              </p>

              <h3 className="text-primary mt-12 pl-8">{item.name}</h3>
              <p className="pl-8">{item.position}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mx-auto mt-8 flex flex-wrap items-center justify-between gap-4 px-2 lg:max-w-2/3">
        <CarouselPrevious className="static" />
        <CarouselNext className="static md:order-last" />
        <CarouselDots className="h-fit w-fit basis-full md:basis-auto" />
      </div>
    </Carousel>
  )
}
