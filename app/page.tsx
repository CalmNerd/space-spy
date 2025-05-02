import BorderedStyles from "@/components/border-styles";
import { ButtonDemo } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  // tepm svg
  const howToUseSvgPaths = {
    fillPath:
      'M0.5 33.5V16L16 1H291H1366L1371 4.5H1473L1477.5 1H1535L1550 17.5V62L1535 79.5H1487L1482 74.5H70L65 79.5H17.5L0.5 63V33.5Z',
    strokePath:
      'M0.5 16V33.5M0.5 16L16 1H291L1366 1L1371 4.5H1473L1477.5 1H1535L1550 17.5V62L1535 79.5H1487L1482 74.5H70L65 79.5H17.5L0.5 63V16Z',
  };

  //  temp svg for a feature card
  const featureCardSvgPaths = {
    fillPath:
      'M0.5 20V10L10 0.5H150H450L455 2.5H470L475 0.5H490L499.5 10V40L490 49.5H475L470 45H30L25 49.5H10L0.5 40V20Z',
    strokePath:
      'M0.5 10V20M0.5 10L10 0.5H150L450 0.5L455 2.5H470L475 0.5H490L499.5 10V40L490 49.5H475L470 45H30L25 49.5H10L0.5 40V10Z',
  };


  return (
    <div className="flex flex-col gap-6 items-center text-5xl font-geomGraphy font-base justify-center h-screen">
      <span className="font-geomGraphy">this is geom graphy</span>
      <span className="font-roboto-mono">this is roboto mono</span>
      <span className="font-sans">this is geist regular</span>


      <BorderedStyles
        svgPaths={howToUseSvgPaths}
        viewBox="0 0 1551 80"
        className="max-w-[1551px] aspect-[1551/80] text-center"
      >
        <div>
          <h2 className="text-2xl font-bold uppercase md:text-3xl">How to Use</h2>
          <p className="mt-2 text-sm md:text-base">
            Transform X Spaces into valuable insights with AI
          </p>
        </div>
      </BorderedStyles>

      {/* need to modify the cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <BorderedStyles
          svgPaths={featureCardSvgPaths}
          viewBox="0 0 500 50"
          className="max-w-[500px] aspect-[500/50]"
        >
          <Card className="bg-transparent border-none text-white w-full">
            <CardHeader>
              <CardTitle className="text-lg">Save Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Get full transcriptions and summaries without listening to hours of content
              </p>
            </CardContent>
          </Card>
        </BorderedStyles>
      </div>

      <ButtonDemo />
    </div>
  );
}