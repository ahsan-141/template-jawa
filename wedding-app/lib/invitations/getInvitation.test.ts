import { getInvitationBySlug, getAllInvitations } from './getInvitation';

async function main() {
  const all = await getAllInvitations();
  console.log('All published count:', all.length);

  const yogi = await getInvitationBySlug('yogi-ratna');
  const andi = await getInvitationBySlug('andi-siti');
  const budi = await getInvitationBySlug('budi-citra');
  const notFound = await getInvitationBySlug('not-found');

  console.log('Yogi:', yogi?.slug, '->', yogi?.themeId, '->', yogi?.data.groom.name);
  console.log('Andi:', andi?.slug, '->', andi?.themeId, '->', andi?.data.groom.name);
  console.log('Budi:', budi?.slug, '->', budi?.themeId, '->', budi?.data.groom.name);
  console.log('NotFound test:', notFound);
}

main();
